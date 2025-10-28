export interface GridModel {
     columns: GridColumn[];
  rowData: any;
  pagination?: boolean;
  pageSize?: number;
}
export interface GridColumn{
   field: string;
  headerName: string;
  sortable?: boolean;
  filter?: boolean;
  width?: number;

}
