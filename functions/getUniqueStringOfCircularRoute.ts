import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";
import { generateUniqueStringOfArray } from "./generateUniqueStringOfArray";

export function getUniqueStringOfCircularRoute(route: number[]): string {
    return generateUniqueStringOfArray(
        generateUniqueArrayOfCircularPath(route),
    );
}
