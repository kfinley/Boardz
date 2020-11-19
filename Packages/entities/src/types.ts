export interface AppUser {
  username: string;
}

export enum SortDirection {
  Ascending,
  Descending,
}

export interface EntitySet {
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;
  properties: Array<string>;
  current: [];
  all: [];
}

export interface EntityResult<T> {
  Entities: T[];
  TotalRecords: number;
}
