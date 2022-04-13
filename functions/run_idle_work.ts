export function run_idle_work(work: () => void, timeout: number = 2000) {
    const startTask = (deadline: {
        timeRemaining: () => number;
        didTimeout: boolean;
    }) => {
        // 如果 `task` 花费的时间是20ms
        // 超过了当前空闲时间的剩余毫秒数，我们等到下一次空闲时间执行task
        if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
            // 将任务带到下一个空闲时间周期内
            // 添加到下一个空闲时间周期callback列表的末尾
            work();
        } else {
            // 执行任务
            requestIdleCallback(startTask, { timeout: timeout });
        }
    };

    requestIdleCallback(startTask, { timeout: timeout });
}
