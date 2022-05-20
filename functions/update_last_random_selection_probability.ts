//更新随机选择概率
export function update_last_random_selection_probability({
    coefficient_of_diversity_increase,
    lastrandom_selection_probability,
}: {
    coefficient_of_diversity_increase: number;
    lastrandom_selection_probability: number;
}): number {
    const nextrandom_selection_probability =
        coefficient_of_diversity_increase / 50;
    lastrandom_selection_probability = Math.max(
        nextrandom_selection_probability,
        lastrandom_selection_probability / 10
    );
    return lastrandom_selection_probability;
}
