export const isTypeOf = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function typeName(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

// export class TypeFactory {
//   create<T>(type: new () => T): T {
//     return new type();
//   }
// }
