import { sum, uniq } from "lodash";
import { assert_true } from "../test/assert_true";
import { getUniqueStringOfCircularRoute } from "./getUniqueStringOfCircularRoute";
// import { ispathsequalinbothdirectionswithcycle } from "./ispathsequalinbothdirectionswithcycle";

export function calc_population_relative_information_entropy(
    routes: Array<number[]>
) {
    if (!(routes.length >= 2)) {
        throw new Error("incorrect routes");
    }
    if (!(routes[0].length >= 2)) {
        throw new Error("incorrect routes");
    }
    const routesnumber = routes.length;
    const nodesnumber = routes[0].length;
    if (!routes.every((route) => route.length === nodesnumber)) {
        throw new Error("incorrect routes");
    }
    const unique_strings = routes.map((r) => getUniqueStringOfCircularRoute(r));
    const notrepeatroutes =
        uniq(
            unique_strings
        ); /*  routes.reduce((previous: number[][], route) => {
        if (previous.length) {
            if (
                previous.some((notrepeatroute) =>
                    ispathsequalinbothdirectionswithcycle(route, notrepeatroute)
                )
            ) {
                return previous;
            } else {
                return [...previous, route];
            }
        } else {
            return [route];
        }
    }, []); */
    const fitnessvalues = notrepeatroutes.map((route) =>
        unique_strings.reduce(
            (previous, current) =>
                previous +
                Number(
                    route === current
                    // ispathsequalinbothdirectionswithcycle(current, route)
                ),
            0
        )
    );
    const sumfitnessvalues = sum(fitnessvalues);
    const fitnessweight = fitnessvalues.map((v) => v / sumfitnessvalues);
    const result = Math.min(
        1,
        -sum(fitnessweight.map((fitness) => fitness * Math.log(fitness))) /
            Math.log(routesnumber)
    );
    if (Number.isNaN(result)) {
        throw new Error("Accident ");
    }
    assert_true(result <= 1);
    return result;
}
