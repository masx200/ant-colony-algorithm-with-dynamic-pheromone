import {
    reactive,
    effect,
    stop,
    computed,
    ref,
    shallowReadonly,
} from "@vue/reactivity";
export interface ThreadPool<
    W extends {
        terminate: () => void;
    }
    > {
    onQueueSizeChange(callback: (queueSize: number) => void): () => void;
    drain(): boolean;
    destroy: () => void;
    run<R>(
        callback: (w: W) => Promise<R>,
        signal?: AbortSignal | undefined
    ): Promise<R>;
    maxThreads: number;
    [Symbol.toStringTag]: string;
    destroyed(): boolean;
    free(): boolean;
    busy(): boolean;
    threads: readonly W[];
    queueSize(): number;
    pendingSize(): number;
    onPendingSizeChange(callback: (pendingSize: number) => void): () => void;
}
const get_cpu_Count = function (): number {
    if (typeof navigator !== "undefined") {
        return navigator.hardwareConcurrency;
    }

    if (typeof os !== "undefined") {
        return os.cpus().length;
    }
    return 1;
};
export function createThreadPool<W extends { terminate: () => void }>(
    create: () => W,

    maxThreads = get_cpu_Count()
): ThreadPool<W> {
    const queue = reactive(new Map<number, (w: W) => Promise<unknown>>());
    let destroyed = ref(false);
    let id = 0;
    const pending = reactive(new Map<number, (w: W) => Promise<unknown>>());
    const results = reactive(new Map<number, Promise<unknown>>());
    const free = computed(() => {
        return pending.size < maxThreads;
    });

    const f = effect(() => {
        if (queue.size === 0) {
            return;
        }
        if (free.value) {
            next();
        }
    });
    const threads: W[] = [];

    function run<R>(
        callback: (w: W) => Promise<R>,
        signal?: AbortSignal
    ): Promise<R> {
        // debugger;
        if (destroyed.value) {
            throw new Error("can not run on destroyed pool");
        }
        const task_id = id;
        id++;
        add(callback, task_id);
        if (free.value) {
            next();
        }
        return new Promise<R>((resolve, reject) => {
            const abort_listener = () => {
                reject(new Error("task signal aborted"));
                s();
                const maps = [queue, pending, results]
                maps.forEach(m => m.delete(task_id))
                const index = task_id % maxThreads;
                const w = threads.splice(index, 1)
                w[0].terminate()
            };
            if (signal) {
                signal.addEventListener("abort", abort_listener);
                if (signal.aborted) {
                    abort_listener()
                }
            }
            function s() {
                stop(d);
                stop(e);
                if (signal) {
                    signal.removeEventListener("abort", abort_listener);
                }
            }

            const d = effect(() => {
                if (destroyed.value) {
                    reject(new Error("pool is destroyed"));
                    stop(d);
                    s();
                }
            });

            const e = effect(() => {
                const result = results.get(task_id) as unknown as Promise<R> | undefined
                if (result) {
                    resolve(result);
                    stop(e);
                    results.delete(task_id);
                    s();
                }
            });
        });
    }
    function get(task_id: number): W {

        const index = task_id % maxThreads;
        while (typeof threads[index] === "undefined") {
            threads.push(create());
        }
        return threads[index];
    }
    function add<R>(callback: (w: W) => Promise<R>, task_id: number): void {
        queue.set(task_id, callback);
    }
    function next() {
        // debugger;
        if (pending.size >= maxThreads) {
            return;
        }
        if (queue.size === 0) {
            return;
        }
        if (queue.size) {
            const [task_id, callback] = [...queue.entries()][0];
            queue.delete(task_id);
            const w = get(task_id);
            pending.set(task_id, callback);
            const p = callback(w);
            p.finally(() => {
                pending.delete(task_id);
                results.set(task_id, p);
            });
            Promise.resolve().then(() => {
                next();
            });
        }
    }
    function destroy() {
        threads.forEach((w) => w.terminate());
        threads.length = 0;
        pending.clear();
        results.clear();
        queue.clear();
        stop(f);
        destroyed.value = true;
    }
    function onQueueSizeChange(
        callback: (queueSize: number) => void
    ): () => void {
        const r = effect(() => {
            callback(queue.size);
        });
        return () => {
            stop(r);
        };
    }
    function onPendingSizeChange(
        callback: (pendingSize: number) => void
    ): () => void {
        const r = effect(() => {
            callback(pending.size);
        });
        return () => {
            stop(r);
        };
    }
    return {
        onPendingSizeChange,
        onQueueSizeChange,
        queueSize() {
            return queue.size;
        },
        pendingSize() {
            return pending.size;
        },
        threads: shallowReadonly(threads),
        destroy,
        run,
        destroyed() {
            return destroyed.value;
        },
        maxThreads,
        [Symbol.toStringTag]: "ThreadPool",
        free() {
            return free.value;
        },
        busy() {
            return !free.value;
        },
        drain() {
            return queue.size === 0;
        },
    };
}
