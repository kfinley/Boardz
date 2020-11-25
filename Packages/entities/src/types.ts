export interface AppUser {
  username: string;
}

export enum SortDirection {
  Ascending,
  Descending,
}

export interface EntitySet {
  id: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;
  properties: string;
  result: [];  
}

export interface EntityResult<T> {
  Entities: T[];
  TotalRecords: number;
}
