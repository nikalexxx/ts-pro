import { P_Array } from './array';
import { P_List } from './list';
import { P_Turple } from './turple';

export namespace P_Function {
    /**
     * any function
     */
    export type Instance = (...args: any) => any;

    /**
     * @param F function
     * @param T target type
     * @returns filtered list of function parameters
     * @example
     * ```ts
     * P_Function.FilterParameters<(a: string, b: number) => string, string>; // [string, never]
     * ```
     */
    export type FilterParameters<F extends Instance, T> = P_List.FilterMap<
        Parameters<F>,
        T
    >;

    /**
     * Result function for chaining functions
     *
     * `f: A => B` |> `g: B => C` |> `h: C => D` ~ `x => h(g(f(x)))` ~ `A => D`
     *
     * @param FunctionList list of chaining functions
     *
     * @example
     * ```ts
     * P_Function.Pipe<[(a: string) => number, (a: number) => boolean]>; // (a: string) => boolean
     * P_Function.Pipe<[(a: string) => number, (a: string) => boolean]>; // never (number not extends string)
     * P_Function.Pipe<((a: 'a' | 'b' | 'c') => 'a' | 'b')[]>; // (a: 'a' | 'b' | 'c') => 'a' | 'b'
     * P_Function.Pipe<((a: 'a' | 'b') => 'a' | 'b' | 'c')[]>; // never
     * ```
     */
    export type Pipe<
        FunctionList extends Instance[],
        StartParams extends any[] = Parameters<FunctionList[0]>
    > = FunctionList extends []
        ? never
        : FunctionList extends P_Turple.NonEmpty
        ? FunctionList[0] extends Instance
            ? FunctionList extends [any]
                ? (...args: StartParams) => ReturnType<FunctionList[0]>
                : FunctionList extends [any, any, ...any[]]
                ? Parameters<FunctionList[1]> extends [any]
                    ? ReturnType<FunctionList[0]> extends Parameters<
                          FunctionList[1]
                      >[0]
                        ? Pipe<P_Turple.Tail<FunctionList>, StartParams>
                        : never
                    : never
                : never
            : never
        : ReturnType<P_Array.Item<FunctionList>> extends Parameters<
              P_Array.Item<FunctionList>
          >[0]
        ? P_Array.Item<FunctionList>
        : never;

    /**
     * Result function for compose functions
     *
     * `h: C => D` <| `g: B => C` <| `f: A => B` ~ `x => h(g(f(x)))` ~ `A => D`
     *
     * @param FunctionList list of compose functions
     *
     * @example
     * ```ts
     * P_Function.Compose<[(a: string) => boolean, (a: number) => string]>; // (a: number) => boolean
     * P_Function.Compose<[(a: string) => number, (a: string) => boolean]>; // never (bollean not extends string)
     * P_Function.Compose<((a: 'a' | 'b' | 'c') => 'a' | 'b')[]>; // (a: 'a' | 'b' | 'c') => 'a' | 'b'
     * P_Function.Compose<((a: 'a' | 'b') => 'a' | 'b' | 'c')[]>; // never
     * ```
     */
    export type Compose<FunctionList extends Instance[]> = Pipe<
        P_List.Revert<FunctionList>
    >;
}
