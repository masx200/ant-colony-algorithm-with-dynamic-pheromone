export function update_weight_of_opt({
    get_weight_of_opt_best,
    get_weight_of_opt_current,
    set_weight_of_opt_best,
    coefficient_of_diversity_increase,
    set_weight_of_opt_current,
}: {
    get_weight_of_opt_best: () => number;
    get_weight_of_opt_current: () => number;
    set_weight_of_opt_best: (value: number) => void;
    coefficient_of_diversity_increase: number;
    set_weight_of_opt_current: (value: number) => void;
}) {
    const avarage_weight =
        (get_weight_of_opt_best() + get_weight_of_opt_current()) / 2;
    set_weight_of_opt_best(
        get_weight_of_opt_best() +
            (coefficient_of_diversity_increase / 4) *
                ((avarage_weight * 1) / 3 - get_weight_of_opt_best())
    );
    set_weight_of_opt_current(
        get_weight_of_opt_current() +
            (coefficient_of_diversity_increase / 4) *
                ((avarage_weight * 5) / 3 - get_weight_of_opt_current())
    );
}
