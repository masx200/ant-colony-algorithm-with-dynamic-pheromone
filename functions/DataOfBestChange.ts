export interface DataOfBestChange {
    time_of_best_ms: number;
    global_best_route: number[];
    global_best_length: number;
    total_time_ms: number;
    current_search_count: number;
    current_iterations: number;
    search_count_of_best: number;
}
