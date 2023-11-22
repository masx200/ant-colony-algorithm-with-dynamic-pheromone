export function get_worst_route_Of_Series_routes_and_lengths(
    routes_and_lengths: {
        route: number[];
        length: number;
    }[],
): {
    route: number[];
    length: number;
} {
    if (!(routes_and_lengths.length > 0)) {
        throw new Error("routes_and_lengths empty!");
    }
    const iterate_best_lengthandroute = routes_and_lengths.reduce(
        (previous, current) => {
            return previous.length > current.length ? previous : current;
        },
        routes_and_lengths[0],
    );

    return iterate_best_lengthandroute;
}
