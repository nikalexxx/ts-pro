# ts-pro

Advanced utility types for TypeScript

![Latest Stable Version](https://img.shields.io/npm/v/ts-pro.svg)



## Installation

```bash
# NPM
npm install ts-pro

# YARN
yarn add ts-pro
```


## P_List
List — tuple or any array.
All types are applied first to tuples, and in the case of a mismatch, to the rest of the common array cases.

### `Head<List>`

`[0] - [ ] - [ ] - [ ] - ...`

`Head(List) ^ never` first element of list

```typescript
P_List.Head<string[]>; // string | undefined (undefined for empty array)
P_List.Head<['a', 1, null]>; // 'a'
P_List.Head<[]>; // never
```


### `Tail<List>`

`[ ] - [0] - [0] - [0] - ...`

`Tail(List) ^ never` all elements of list after first element

```typescript
P_List.Tail<string[]>; // (string | undefined)[] (undefined for empty array and array from one item)
P_List.Tail<['a', 1, null]>; // [1, null]
P_List.Tail<[]>; // never
```


### `Item<List>`
`[A] - [A] - [A] - ... => A`

`[A] - [B] - [C] - ... => (A | B | C | ...)`

`Item(List) ^ never` type of any element in list

```typescript
P_List.Item<string[]>; // string
P_List.Item<['a', 1, null]>; // 'a' | 1 | null
P_List.Item<[]>; // never
```


### `Filter<List, T>`
Filtered list

```typescript
P_List.Filter<[true, false[], boolean], boolean>; // [true, boolean]
P_List.Filter<[1, 2, 2 | 3, 9, 1 | 9], 2 | 3 | 9>; // [2, 2 | 3, 9]
P_List.Filter<string[], unknown>; // string[]
P_List.Filter<number[], boolean>; // []
```

### `Map<List, T>`

Mapped list with `T` filling

```typescript
P_List.Map<[1, 2, 3], 0>; // [0, 0, 0]
P_List.Map<string[], 0>; // 0[]
```

### `FilterMap<List, T>`

Filtered list with fill-in `never` in place of mismatches

```typescript
P_List.FilterMap<[1, number, 'a', string], string>; // [never, never, 'a', string]
P_List.FilterMap<boolean[], string>; // never[]
```

### `Find<List, T>`

`subtype(T) ^ never` found subtype

```typescript
P_List.Find<[true, boolean, 2, number, 3], number>; // 2
P_List.Find<number[], string>; // never
```

### `Every<List, T>`

`true ^ false` — every item of list is subtype `T`
```typescript
P_List.Every<[1, 9.4, typeof Infinity, number], number>; // true
P_List.Every<number[], string>; // false
```

### `Revert<List>`
Reverted list
```typescript
P_List.Revert<[1, 'a', string]>; // [string, 'a', 1]
P_List.Revert<number[]>; // number[]
```

## P_String

### `Filter<T, W>`
Removed `W` from `T`
```typescript
P_String.Filter<'a b c', ' '>; // 'abc'
P_String.Filter<'123', '2'>; // '13'
```

### `Trim<T, W = ' '>`
Removed `W` from `T` in start and end
```typescript
P_String.Trim<'   897      '>; // '897'
P_String.Trim<'__get', '_'>; // 'get'
```

### `Reverse<T>`
Reverse string
```typescript
P_String.Reverse<'1,2,3,4,5'>; // '5,4,3,2,1'
```

### `Replace<T, W, R>`
Replace `W` to `R` in `T`
```typescript
P_String.Replace<'Hello. Go away.', '.', '!'>; // 'Hello! Go away!'
P_String.Replace<P_String.Replace<
  '#{count} points in category #{category}',
  '#{count}', '12'>,
  '#{category}', 'typescript'>;
// '12 points in category typescript'
```

## P_Object

### `FilterByValue<Obj, T>`

```typescript
FilterByValue<{a: 1; b: 'one'; c: number}, number>; // {a: 1; c: number}
```

### `FilterByKey<Obj, T>`
```typescript
FilterByKey<{a: 1; b: 'one'}, 'b' | 'c'>; // {b: 'one'}
```

## P_Function

### `Instance`
any function `(...args: any) => any`

### `FilterParameters<F, T>`

Filtered list of function parameters

```typescript
P_Function.FilterParameters<(a: string, b: number) => string, string>; // [string, never]
```

### `Pipe<FunctionList>`
Result function for chaining functions

`f: A => B` |> `g: B => C` |> `h: C => D` ~ `x => h(g(f(x)))` ~ `A => D`

```typescript
P_Function.Pipe<[(a: string) => number, (a: number) => boolean]>; // (a: string) => boolean
P_Function.Pipe<[(a: string) => number, (a: string) => boolean]>; // never (number not extends string)
P_Function.Pipe<((a: 'a' | 'b' | 'c') => 'a' | 'b')[]>; // (a: 'a' | 'b' | 'c') => 'a' | 'b'
P_Function.Pipe<((a: 'a' | 'b') => 'a' | 'b' | 'c')[]>; // never
```

### `Compose<FunctionList>`

Result function for compose functions

`h: C => D` <| `g: B => C` <| `f: A => B` ~ `x => h(g(f(x)))` ~ `A => D`

```typescript
P_Function.Compose<[(a: string) => boolean, (a: number) => string]>; // (a: number) => boolean
P_Function.Compose<[(a: string) => number, (a: string) => boolean]>; // never (bollean not extends string)
P_Function.Compose<((a: 'a' | 'b' | 'c') => 'a' | 'b')[]>; // (a: 'a' | 'b' | 'c') => 'a' | 'b'
P_Function.Compose<((a: 'a' | 'b') => 'a' | 'b' | 'c')[]>; // never
```

## P_Tuple

Tuple — fixed-length array.

### `Empty`
Empty tuple `[]`

### `NonEmpty<T = any>`
Non-empty tuple `[T, ...T[]]`

### `Instance<T = any>`
Tuple `Empty | NonEmpty<T>`

### `P_Tuple` list types
`Head`, `Tail`, `Item`, `Filter`, `Map`, `FilterMap`, `Find`, `Every`, `Revert`

## P_Array

### `Instance<T = any>`
Array `T[]`

### `P_Array` list types
`Head`, `Tail`, `Item`, `Filter`, `Map`, `FilterMap`, `Find`, `Every`


## Other types

### `P_Options<TupleList>`
First non never type in list or `never`.
Selecting types in turn.

```typescript
P_Options<[never, never, string, number]>; // string

// in generics
type stringName<T> = T extends string ? 'string' : never;
type numberName<T> = T extends number ? 'number' : never;
type booleanName<T> = T extends boolean ? 'boolean' : never;
type typeName<T> = P_Options<[stringName<T>, numberName<T>, booleanName<T>, 'unknown']>;

typeName<1>; // 'number'
typeName<string[]>; // 'unknown'
```

### `P_Optional<T>`
`T | undefined`
