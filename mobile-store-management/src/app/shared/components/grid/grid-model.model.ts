import { StorageName } from "../../enum/common-enum";

export interface GridModel {
  colDefs: GridColumn[];
  rowData: any;
  pagination?: boolean;
  pageSize?: number;
  editable?:boolean;
}
export interface GridColumn{
  field: string;
  headerName: string;
  sortable?: boolean;
  filter?: boolean;
  width?: number;
  headerClass?:any;
  cellClass?: any;
  editable?: any;
  resizable?: boolean | false;

}


// export class AgGridI {
//     colDefs: AgColDefsI[];
//     rows?:any[];
//     storageName?: StorageName;
//     filterStorageName?:StorageName;
//     apiUrl? : string;
//     sortStorageName? : StorageName;
//     initialRows?: StorageName;
//     paginationStorageName? : StorageName;
//     addBlankRowOnEnter?:boolean;
//     columnSettings?:boolean;
//     singleClickEdit?:boolean;
//     tableId? : StorageName;
//     isServerSidepagination?: boolean = false;
//     tabIndex?: number;
//     showPagination?: boolean = false;
//     leftSideShowPagination?: boolean = false;
//     showFilter? : boolean = false;
//     headerHeight? : number;
//     rowHeight? : number;
//     isFilter?:boolean=false;
//     floatingDropDown?:boolean=false;
//     floatingMultiselectDropDown?: boolean =false;
//     tableIndex?: number =0;
//     filterIdColumnName?:string;
//     moreButton?:boolean=true;
//     selectAll?:boolean=true;
//     editable?:boolean=true;
//     headerComponentParams?:{};
//     columnTypes?: any;
//     columnCellType? : any;
//     deleteThroughApi? : any = false;
  
// }

//  export class AgColDefsI {
//    wrapText?:boolean;
//    autoHeight?:boolean;
//     headerName?: string;
//     headerClass?:any;
//     footerClass?:string;
//     isRequired?:boolean;
//     field?: string;
//     suppressDragLeaveHidesColumns?:boolean;
//     suppressMovable?:boolean;
//     suppressColumnMove?:boolean;
//     lockPosition?: boolean | 'left' | 'right' | null;
//     lockPinned?: boolean;
//     width?: number;
//     valueGetter?: any;
//     valueSetter?: any;
//     minWidth?: number;
//     maxWidth?: number;  
//     resizable?: boolean | false;
//     editable?: any;
//     suppressNavigable?: any;
//     sortable?: boolean | false;
//     isfilter?: boolean | false; // to display filter icon in header
//     pinned?: boolean | 'left' | 'right' | null;
//     headerCheckboxSelection?: boolean | false | any;
//     checkboxSelection?: boolean | false | any;
//     cellClass?: any;
//     hide?: boolean;
//     cellClassRules?:any;
//     cellStyle?:any
//     cellRenderer?:any;
//     cellRendererParams?:any;
//     cellEditor?:any;
//     cellEditorFramework?:any
//     headerComponentFramework?:any;
//     headerGroupComponent?:any;
//     suppressMenu?:boolean;
//     cellRendererFramework?:any;
//     headerComponentParams?:any;
//     tooltipField?:any;
//     flex?:number;
//     children?:any;
//     marryChildren?:boolean = true;
//     headerComponent?:any;
//     footerGroupComponent?:any;
//     footerComponent?:any;
//     cellEditorParams?:any;
//     extraField?:string;
//     filter?:string;
//     valueFormatter?: string | any;
//     filterParams?: string | any;
//     filterStorageName?: string | any;
//     sortStorageName?:string | any;
//     paginationStorageName? :string | any;
//     filterValueColumnName?:string | any;
//  }
