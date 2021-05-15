import { P_Optional } from './logical';

export namespace P_Array {

    export type Instance = any[];

    /**
     * @param List array
     * @returns element of array
     * @example
     * ```ts
     * P_Array.Item<string[]>; // string
     * P_Array.Item<[string, number]>; // string | number
     * P_Array.Item<[]>; // never
     * ```
     */
    export type Item<List extends Instance> = List extends Array<infer X>
        ? X
        : never;

    /**
     * @param List array
     * @returns `Head(List)` first element of array
     * @example
     * ```ts
     * P_Array.Head<string[]>; // string | undefined
     * P_Array.Head<[string, number]>; // string | number | undefined
     * P_Array.Head<[]>; // undefined
     * ```
     */
    export type Head<List extends Instance> = List extends Array<infer X>
        ? P_Optional<X>
        : never;

    /**
     * @param List array
     * @returns `Tail(List)` all elements of array after first element
     * @example
     * ```ts
     * P_Array.Tail<string[]>; // (string | undefined)[]
     * P_Array.Tail<[string, number]>; // <string | number | undefined>[]
     * P_Array.Tail<[]>; // undefined[]
     * ```
     */
    export type Tail<List extends Instance> = List extends Array<infer X>
        ? P_Optional<X>[]
        : never;

    /**
     * @param List array
     * @param T target type
     * @returns filtered array
     * @example
     * ```ts
     * P_Array.Filter<string[], string | boolean>; // string[]
     * P_Array.Filter<[1, 2], number>; // [1, 2]
     * P_Array.Filter<[1, 2], string>; // []
     * ```
     */
    export type Filter<List extends Instance, T> = Item<List> extends T
        ? List
        : [];

    /**
     * @param List array
     * @param T target type
     * @returns mapped array with `T` filling
     * @example
     * ```ts
     * P_Array.Map<string[], number>; // number[]
     * ```
     */
    export type Map<List extends Instance, T> = List extends [] ? List : T[];

    /**
     * @param List array
     * @param T target type
     * @returns filtered array with fill-in `never` in place of mismatches
     * @example
     * ```ts
     * P_Array.FilterMap<string[], string>; // string[]
     * P_Array.FilterMap<number[], string>; // never[]
     * ```
     */
    export type FilterMap<List extends Instance, T> = Item<List> extends T
        ? List
        : never[];

    /**
     * @param List array
     * @param T target type
     * @returns `subtype(T) ^ never` item with subtype in array
     * @example
     * ```ts
     * P_Array.Find<'a'[], string>; // 'a'
     * P_Array.Find<number[], string>; // never
     * ```
     */
    export type Find<List extends Instance, T> = Item<List> extends T
        ? Item<List>
        : never;

    /**
     * @param List array
     * @param T target type
     * @returns `true ^ false`
     * @example
     * ```ts
     * P_Array.Every<string[], string | boolean>; // true
     * P_Array.Every<number[], string>; // false
     * ```
     */
    export type Every<List extends Instance, T> = Find<List, T> extends never ? false : true;
}
