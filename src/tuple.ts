/**
 * Tuple — fixed-length array
 */
export namespace P_Tuple {
    /**
     * Empty tuple
     */
    export type Empty = [];

    /**
     * Non-empty tuple
     */
    export type NonEmpty<T = any> = [T, ...T[]];


    /**
     * Any tuple
     */
    export type Instance<T = any> = Empty | NonEmpty<T>;

    /**
     * @param List tuple
     * @returns `Tail(List) ^ never` all elements of tuple after first element
     * @example
     * P_Tuple.Tail<[1, 2, 3]>; // [2, 3]
     * P_Tuple.Tail<[string]>; // []
     * P_Tuple.Tail<[]>; // never
     */
    export type Tail<List extends Instance> = List extends [any, ...infer X]
        ? X extends Instance
            ? X
            : never
        : never;

    /**
     * @param List tuple
     * @returns `Head(List) ^ never` first element of tuple
     * @example
     * P_Tuple.Head<[1, 2, 3]>; // 1
     * P_Tuple.Head<[]>; // never
     */
    export type Head<List extends Instance> = List extends [infer X, ...any]
        ? X
        : never;

    /**
     * @param List tuple
     * @returns union of tuple values
     * @example
     * ```ts
     * P_Tuple.Item<['a', 'b', 'c']>; // 'a' | 'b' | 'c'
     * ```
     */
    export type Item<List extends Instance> = List extends Array<infer X>
        ? X
        : never;

    /**
     * @param List tuple
     * @param T target type
     * @returns filtered tuple
     * @example
     * ```ts
     * P_Tuple.Filter<[true, false[], boolean], boolean>; // [true, boolean]
     * P_Tuple.Filter<[1, 2, 2 | 3, 9, 1 | 9], 2 | 3 | 9>; // [2, 2 | 3, 9]
     * ```
     */
    export type Filter<List extends Instance, T> = List extends Empty
        ? List
        : Head<List> extends T
        ? [Head<List>, ...Filter<Tail<List>, T>]
        : Filter<Tail<List>, T>;

    /**
     * @param List tuple
     * @param T target type
     * @returns mapped tuple with `T` filling
     * @example
     * ```ts
     * P_Tuple.Map<[1, 2, 3], 0>; // [0, 0, 0]
     * ```
     */
    export type Map<List extends Instance, T> = List extends []
        ? List
        : [T, ...Map<Tail<List>, T>];

    /**
     * @param List tuple
     * @param T target type
     * @returns filtered tuple with fill-in `never` in place of mismatches
     * @example
     * P_Tuple.FilterMap<[1, number, 'a', string], string>; // [never, never, 'a', string]
     * P_Tuple.FilterMap<[typeof Array.toString, typeof Array, 'length'], (...args: any) => any>;
     * // [() => string, ArrayConstructor, never]
     */
    export type FilterMap<List extends Instance, T> = List extends []
        ? List
        : Head<List> extends T
        ? [Head<List>, ...FilterMap<Tail<List>, T>]
        : [never, ...FilterMap<Tail<List>, T>];

    /**
     * @param List tuple
     * @param T target type
     * @returns `subtype(T) ^ never` first found subtype
     * @example
     * P_Tuple.Find<[true, boolean, 2, number, 3], number>; // 2
     * P_Tuple.Find<[string, {a: 1}], any[]>; // never
     */
    export type Find<List extends Instance, T> = List extends []
        ? never
        : Head<List> extends T
        ? Head<List>
        : Find<Tail<List>, T>;

    /**
     * @param List tuple
     * @param T target type
     * @returns `true ^ false`
     * @example
     * P_Tuple.Every<[1, 9.4, typeof Infinity, number], number>; // true
     * P_Tuple.Every<['a', string, {}], string>; // false
     */
    export type Every<List extends Instance, T> = List extends []
        ? true
        : Head<List> extends T
        ? Every<Tail<List>, T>
        : false;

    /**
     * @param List tuple
     * @returns reverted list
     * @example P_Tuple.Revert<[1, 'a', string]>; // [string, 'a', 1]
     */
    export type Revert<List extends Instance> = List extends Empty
        ? List
        : List extends [any]
        ? List
        : List extends NonEmpty
        ? [...Revert<Tail<List>>, Head<List>]
        : never;
}
