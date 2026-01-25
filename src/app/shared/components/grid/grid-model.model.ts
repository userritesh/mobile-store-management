import { StorageName } from "../../enum/common-enum";

export interface GridModel {
  colDefs: GridColumn[];
  rowData: any;
  pagination?: boolean;
  pageSize?: number;
  editable?: boolean;
  minWidth?: number;
}
export interface GridColumn {
  field: string;
  headerName: string;
  sortable?: boolean;
  filter?: boolean;
  width?: number;
  headerClass?: any;
  cellClass?: any;
  editable?: any;
  resizable?: boolean | false;
   minWidth?: number;

}


