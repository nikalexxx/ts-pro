import { P_Tuple } from './tuple';

/**
 * Select types in turn
 *
 * @param List list of types
 * @returns first non never type or `never`
 * @example
 * ```ts
 * P_Options<[never, never, string, number]>; // string
 *
 * // in generics
 * type stringName<T> = T extends string ? 'string' : never;
 * type numberName<T> = T extends number ? 'number' : never;
 * type booleanName<T> = T extends boolean ? 'boolean' : never;
 *
 * type typeName<T> = P_Options<[stringName<T>, numberName<T>, booleanName<T>, 'unknown']>;
 * typeName<1>; // 'number'
 * typeName<string[]>; // 'unknown'
 * ```
 */
export type P_Options<List extends P_Tuple.NonEmpty> = List extends [infer X]
    ? X
    : List[0] extends never
    ? P_Tuple.Tail<List> extends P_Tuple.NonEmpty
        ? P_Options<P_Tuple.Tail<List>>
        : never
    : List[0];
