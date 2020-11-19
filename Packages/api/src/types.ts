export enum SortDirection {
    Ascending,
    Descending
}

export interface GetAllEntitiesRequest {
    type: string,
    pageNumber: number, 
    pageSize: number, 
    sortBy?: string,
    sortDirection?: SortDirection,
    filters: string,
    properties: Array<string>
}

export interface EntityResult<T> {
    Entities: T[];
    TotalRecords: number;
  }
  