export function debounce_animation_frame<
    T extends (this: any, ...args: any[]) => void,
>(fn: T): T {
    let timer: undefined | number;
    return function (...args): void {
        const context = this;

        timer && cancelAnimationFrame(timer);
        timer = requestAnimationFrame(() => {
            Reflect.apply(fn, context, args);
        });
    } as T;
}
