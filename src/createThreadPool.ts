import { reactive, effect, stop, computed, ref } from "@vue/reactivity";
export interface ThreadPool<
    W extends {
        terminate: () => void;
    }
> {
    clear: () => void;
    run<R>(callback: (w: W) => Promise<R>): Promise<R>;
    size: number;
    [Symbol.toStringTag]: string;
    destroyed(): boolean;
    free(): boolean;
    busy(): boolean;
}

export function createThreadPool<W extends { terminate: () => void }>(
    create: () => W,
    {
        size = navigator.hardwareConcurrency,
    }: {
        size?: number;
    }
): ThreadPool<W> {
    const queue = reactive(new Map<number, (w: W) => Promise<unknown>>());
    let destroyed = ref(false);
    let id = 0;
    const running = reactive(new Map<number, (w: W) => Promise<unknown>>());
    const results = reactive(new Map<number, Promise<unknown>>());
    const free = computed(() => {
        return running.size < size;
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

    function run<R>(callback: (w: W) => Promise<R>): Promise<R> {
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
            function s() {
                stop(d);
                stop(e);
            }

            const d = effect(() => {
                if (destroyed.value) {
                    reject(new Error("pool is destroyed"));
                    stop(d);
                    s();
                }
            });

            const e = effect(() => {
                const result = results.get(task_id) as unknown as R;
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
        if (threads.length < size) {
            threads.push(create());
        }
        return threads[task_id % size];
    }
    function add<R>(callback: (w: W) => Promise<R>, task_id: number): void {
        queue.set(task_id, callback);
    }
    function next() {
        if (running.size >= size) {
            return;
        }
        if (queue.size) {
            const [task_id, callback] = [...queue.entries()][0];
            queue.delete(task_id);
            const w = get(task_id);
            running.set(task_id, callback);
            const p = callback(w);
            p.finally(() => {
                running.delete(task_id);
                results.set(task_id, p);
            });
        }
        Promise.resolve().then(() => {
            next();
        });
    }
    function clear() {
        threads.forEach((w) => w.terminate());
        threads.length = 0;
        running.clear();
        results.clear();
        queue.clear();
        stop(f);
        destroyed.value = true;
    }
    return {
        clear,
        run,
        destroyed() {
            return destroyed.value;
        },
        size,
        [Symbol.toStringTag]: "ThreadPool",
        free() {
            return free.value;
        },
        busy() {
            return !free.value;
        },
    };
}
