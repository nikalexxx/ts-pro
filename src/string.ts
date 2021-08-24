export namespace P_String {
    export type Instance<T extends string = string> = T;

    /**
     * @param T text for filtering
     * @param W removed string
     * @returns text `T` without strings `W`
     * @example
     * ```typescript
     * type TextWithoutSpace = Filter<'a b c', ' '>; // 'abc'
     * ```
     */
    export type Filter<
        T extends string,
        W extends string
    > = T extends `${infer X}${W}${infer Y}` ? `${X}${Filter<Y, W>}` : T;

    /**
     * @param T text
     * @param W string for trim (space by default)
     * @returns text `T` without start strings `W` and end strings `W`
     * @example
     * ```typescript
     * type BeatifulCode = Trim<'   897      '>; // '897'
     * type SimpleName = Trim<'__get', '_'>; // 'get'
     * ```
     */
    export type Trim<
        T extends string,
        W extends string = ' '
    > = T extends `${W}${infer X}`
        ? Trim<X>
        : T extends `${infer X}${W}`
        ? Trim<X>
        : T;

    /**
     * @param T text
     * @returns reversed text
     * @example
     * ```typescript
     * type ReverseOrder = Reverse<'1,2,3,4,5'>; // '5,4,3,2,1'
     * ```
     */
    export type Reverse<T extends string> = T extends `${infer X}${infer Y}`
        ? `${Reverse<Y>}${X}`
        : T;

    /**
     * @param T text
     * @param W string for replace
     * @param R string for insert
     * @returns text `T` which every string `W` will be replaced to `R`
     * @example
     * ```typescript
     * type CryingText = Replace<'Hello. Go away.', '.', '!'>; // 'Hello! Go away!'
     * type TextFromTemplate = Replace<Replace<'#{count} points in category #{category}',
     *     '#{count}', '12'>,
     *   '#{category}', 'typescript'>; // '12 points in category typescript'
     * ```
     */
    export type Replace<
        T extends string,
        W extends string,
        R extends string
    > = T extends `${infer X}${W}${infer Y}`
        ? `${X}${R}${Replace<Y, W, R>}`
        : T;
}
