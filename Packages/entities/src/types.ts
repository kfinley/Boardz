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
  filters: string;
  properties: string;
  result: [];  
}

export interface EntityResult<T> {
  Entities: T[];
  TotalRecords: number;
}
