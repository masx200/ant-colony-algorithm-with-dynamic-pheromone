import { calc_state_transition_probabilities } from "./calc_state_transition_probabilities";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { pickRandomOne } from "./pickRandomOne";
export function picknextnodeRoulette(
    args: PickNextNodeRouletteOptions
): number {
    const {
        alpha_zero,
        beta_zero,
        getpheromone,
        getdistancebyserialnumber,
        currentnode,
        availablenextnodes,
    } = args;
    if (availablenextnodes.length === 0) {
        throw Error(
            "invalid availablenextnodes:" + JSON.stringify(availablenextnodes)
        );
    }
    const beta = beta_zero;
    const alpha = alpha_zero;
    const result = getnumberfromarrayofnmber(
        pickRandomOne(
            availablenextnodes,
            availablenextnodes.map((nextnode) => {
                const weight = calc_state_transition_probabilities({
                    getpheromone,
                    nextnode,
                    currentnode,
                    alpha,
                    getdistancebyserialnumber,
                    beta,
                });

                return weight;
            })
        )
    );
    return result;
}
