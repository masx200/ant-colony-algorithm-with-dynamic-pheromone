export function get_best_routeOfSeriesRoutesAndLengths(
    routesandlengths: {
        route: number[];
        length: number;
    }[]
): {
    route: number[];
    length: number;
} {
    if (!(routesandlengths.length > 0)) {
        throw new Error("routesandlengths empty!");
    }
    const iteratebestlengthandroute = routesandlengths.reduce(
        (previous, current) => {
            return previous.length < current.length ? previous : current;
        },
        routesandlengths[0]
    );

    return iteratebestlengthandroute;
}
