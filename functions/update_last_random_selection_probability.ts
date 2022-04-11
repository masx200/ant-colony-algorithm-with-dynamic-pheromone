export function update_last_random_selection_probability({
    coefficient_of_diversity_increase,
    lastrandomselectionprobability,
}: {
    coefficient_of_diversity_increase: number;
    lastrandomselectionprobability: number;
}): number {
    const nextrandomselectionprobability =
        coefficient_of_diversity_increase / 12;
    lastrandomselectionprobability = Math.max(
        nextrandomselectionprobability,
        lastrandomselectionprobability / 6
    );
    return lastrandomselectionprobability;
}
