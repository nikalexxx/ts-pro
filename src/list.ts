import { P_Array } from './array';
import { P_Tuple } from './tuple';

/**
 * List — tuple or any array.
 * All types are applied first to tuples, and in the case of a mismatch, to the rest of the common array cases.
 */
export namespace P_List {
    /**
     * `[0] - [ ] - [ ] - [ ] - ...`
     * @param List
     * @returns `Head(List) ^ never` first element of list
     * @example
     * ```ts
     * P_List.Head<string[]>; // string | undefined (undefined for empty array)
     * P_List.Head<['a', 1, null]>; // 'a'
     * P_List.Head<[]>; // never
     * ```
     */
    export type Head<T extends any[]> = T extends P_Tuple.Instance
        ? P_Tuple.Head<T>
        : P_Array.Head<T>;

    /**
     * `[ ] - [0] - [0] - [0] - ...`
     * @param List
     * @returns `Tail(List) ^ never` all elements of list after first element
     * @example
     * ```ts
     * P_List.Tail<string[]>; // (string | undefined)[] (undefined for empty array and array from one item)
     * P_List.Tail<['a', 1, null]>; // [1, null]
     * P_List.Tail<[]>; // never
     * ```
     */
    export type Tail<T extends any[]> = T extends P_Tuple.Instance
        ? P_Tuple.Tail<T>
        : P_Array.Tail<T>;

    /**
     * @param List
     * @param T target type
     * @returns filtered list
     * @example
     * ```ts
     * P_List.Filter<[true, false[], boolean], boolean>; // [true, boolean]
     * P_List.Filter<[1, 2, 2 | 3, 9, 1 | 9], 2 | 3 | 9>; // [2, 2 | 3, 9]
     * P_List.Filter<string[], unknown>; // string[]
     * P_List.Filter<number[], boolean>; // []
     * ```
     */
    export type Filter<List extends any[], T> = List extends P_Tuple.Instance
        ? P_Tuple.Filter<List, T>
        : P_Array.Filter<List, T>;

    /**
     * @param List
     * @param T target type
     * @returns mapped list with `T` filling
     * @example
     * ```ts
     * P_List.Map<[1, 2, 3], 0>; // [0, 0, 0]
     * P_List.Map<string[], 0>; // 0[]
     * ```
     */
    export type Map<List extends any[], T> = List extends P_Tuple.Instance
        ? P_Tuple.Map<List, T>
        : P_Array.Map<List, T>;

    /**
     * @param List
     * @param T target type
     * @returns filtered list with fill-in `never` in place of mismatches
     * @example
     * ```ts
     * P_List.FilterMap<[1, number, 'a', string], string>; // [never, never, 'a', string]
     * P_List.FilterMap<boolean[], string>; // never[]
     * ```
     */
    export type FilterMap<
        List extends any[],
        T
    > = List extends P_Tuple.Instance
        ? P_Tuple.FilterMap<List, T>
        : P_Array.FilterMap<List, T>;

    /**
     * @param List
     * @param T target type
     * @returns `subtype(T) ^ never` found subtype
     * @example
     * ```ts
     * P_List.Find<[true, boolean, 2, number, 3], number>; // 2
     * P_List.Find<number[], string>; // never
     * ```
     */
    export type Find<List extends any[], T> = List extends P_Tuple.Instance
        ? P_Tuple.Find<List, T>
        : P_Array.Find<List, T>;

    /**
     * @param List
     * @param T target type
     * @returns `true ^ false`
     * @example
     * ```ts
     * P_List.Every<[1, 9.4, typeof Infinity, number], number>; // true
     * P_List.Every<number[], string>; // false
     * ```
     */
    export type Every<List extends any[], T> = List extends P_Tuple.Instance
        ? P_Tuple.Every<List, T>
        : P_Array.Every<List, T>;

    /**
     * @param List
     * @returns reverted list
     * @example
     * ```ts
     * P_List.Revert<[1, 'a', string]>; // [string, 'a', 1]
     * P_List.Revert<number[]>; // number[]
     * ```
     */
    export type Revert<List extends any[]> = List extends P_Tuple.Instance
        ? P_Tuple.Revert<List>
        : List;
}
