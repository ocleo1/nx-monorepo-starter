/**
 * Extension of Template Literal Types
 */

/**
 * https://stackoverflow.com/a/63715429
 * https://blog.logrocket.com/guide-conditional-types-typescript/
 */
type CamelizeString<T extends PropertyKey, C extends string = ""> =
  T extends string ? string extends T ? string :
  T extends `${infer F}_${infer R}` ?
  CamelizeString<Capitalize<R>, `${C}${F}`> : `${C}${T}` : T;

type Camelize<T> = {
  [K in keyof T as CamelizeString<K>]: T[K] extends Record<string, any> | undefined
    ? Camelize<NonNullable<T[K]>>
    : T[K] extends Array<any> | undefined
      ? Array<Camelize<NonNullable<T[K]>[number]>>
      : T[K]
}

/**
 * https://stackoverflow.com/a/69328045/6277806
 */
type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>
