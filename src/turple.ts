/**
 * Turple — fixed-length array
 */
export namespace P_Turple {
    /**
     * Empty turple
     */
    export type Empty = [];

    /**
     * Non-empty turple
     */
    export type NonEmpty = [any, ...any[]];

    /**
     * Any turple
     */
    export type Instance = Empty | NonEmpty;

    /**
     * @param List turple
     * @returns `Tail(List) ^ never` all elements of tuple after first element
     * @example
     * P_Turple.Tail<[1, 2, 3]>; // [2, 3]
     * P_Turple.Tail<[string]>; // []
     * P_Turple.Tail<[]>; // never
     */
    export type Tail<List extends Instance> = List extends [any, ...infer X]
        ? X extends Instance
            ? X
            : never
        : never;

    /**
     * @param List turple
     * @returns `Head(List) ^ never` first element of turple
     * @example
     * P_Turple.Head<[1, 2, 3]>; // 1
     * P_Turple.Head<[]>; // never
     */
    export type Head<List extends Instance> = List extends [infer X, ...any]
        ? X
        : never;

    /**
     * @param List turple
     * @param T target type
     * @returns filtered turple
     * @example
     * P_Turple.Filter<[true, false[], boolean], boolean>; // [true, boolean]
     * P_Turple.Filter<[1, 2, 2 | 3, 9, 1 | 9], 2 | 3 | 9>; // [2, 2 | 3, 9]
     */
    export type Filter<List extends Instance, T> = List extends []
        ? List
        : Head<List> extends T
        ? [Head<List>, ...Filter<Tail<List>, T>]
        : Filter<Tail<List>, T>;

    /**
     * @param List turple
     * @param T target type
     * @returns mapped turple with `T` filling
     * @example
     * P_Turple.Map<[1, 2, 3], 0>; // [0, 0, 0]
     */
    export type Map<List extends Instance, T> = List extends []
        ? List
        : [T, ...Map<Tail<List>, T>];

    /**
     * @param List turple
     * @param T target type
     * @returns filtered turple with fill-in `never` in place of mismatches
     * @example
     * P_Turple.FilterMap<[1, number, 'a', string], string>; // [never, never, 'a', string]
     * P_Turple.FilterMap<[typeof Array.toString, typeof Array, 'length'], (...args: any) => any>;
     * // [() => string, ArrayConstructor, never]
     */
    export type FilterMap<List extends Instance, T> = List extends []
        ? List
        : Head<List> extends T
        ? [Head<List>, ...FilterMap<Tail<List>, T>]
        : [never, ...FilterMap<Tail<List>, T>];

    /**
     * @param List turple
     * @param T target type
     * @returns `subtype(T) ^ never` first found subtype
     * @example
     * P_Turple.Find<[true, boolean, 2, number, 3], number>; // 2
     * P_Turple.Find<[string, {a: 1}], any[]>; // never
     */
    export type Find<List extends Instance, T> = List extends []
        ? never
        : Head<List> extends T
        ? Head<List>
        : Find<Tail<List>, T>;

    /**
     * @param List turple
     * @param T target type
     * @returns `true ^ false`
     * @example
     * P_Turple.Every<[1, 9.4, typeof Infinity, number], number>; // true
     * P_Turple.Every<['a', string, {}], string>; // false
     */
    export type Every<List extends Instance, T> = List extends []
        ? true
        : Head<List> extends T
        ? Every<Tail<List>, T>
        : false;

    /**
     * @param List turple
     * @returns reverted list
     * @example P_Turple.Revert<[1, 'a', string]>; // [string, 'a', 1]
     */
    export type Revert<List extends Instance> = List extends Empty
        ? List
        : List extends [any]
        ? List
        : List extends NonEmpty
        ? [...Revert<Tail<List>>, Head<List>]
        : never;
}
