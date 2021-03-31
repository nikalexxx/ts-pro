export namespace P_Object {
    /**
     * @param Obj object
     * @param T target type
     * @example
     * ```ts
     * FilterByValue<{a: 1; b: 'one'; c: number}, number>; // {a: 1; c: number}
     * ```
     */
    export type FilterByValue<Obj, T> = {
        [K in keyof Obj as Obj[K] extends T ? K : never]: Obj[K];
    }

    /**
     * @param Obj object
     * @param T target type
     * @example
     * ```ts
     * FilterByKey<{a: 1; b: 'one'}, 'b' | 'c'>; // {b: 'one'}
     * ```
     */
    export type FilterByKey<Obj, T> = {
        [K in keyof Obj as K extends T ? K : never]: Obj[K];
    }
}
