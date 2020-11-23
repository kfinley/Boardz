// import { VuexModule } from "vuex-module-decorators";
// import { isEmpty, isEqual, cloneDeep } from "lodash";

// export function stateDiff<STATE>(
//   initialState: STATE,
//   storeModule: VuexModule
// ): Partial<STATE> | null {
//   if (!storeModule.state) {
//     return null;
//   }

//   const objectCopy: any = cloneState<STATE>(storeModule);

//   const result: any = Object.keys(initialState).reduce(
//     (diff: any, key: string) => {
//       if (!objectCopy.hasOwnProperty(key)) {
//         diff[key] = (initialState as any)[key];
//       } else if (isEqual((initialState as any)[key], objectCopy[key])) {
//         delete diff[key];
//       }
//       return diff;
//     },
//     objectCopy
//   );

//   if (isEmpty(result)) {
//     return null;
//   }

//   return result as STATE;
// }

// export function cloneState<STATE>(storeModule: VuexModule): STATE {
//   return Object.keys(storeModule.state!).reduce((state: STATE, key: string) => {
//     // The store must be cast as indexable to get the value.
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (state as any)[key] = cloneDeep((storeModule as any)[key]); // NOSONAR
//     return state;
//   }, {} as STATE);
// }
