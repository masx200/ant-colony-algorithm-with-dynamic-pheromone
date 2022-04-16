export type CollectionOfRoutes = Array<{
    route: number[];
    length: number;
}> & {
    add: (route: number[], length: number) => void;
    max_size: number;
    [Symbol.toStringTag]: string;
};
