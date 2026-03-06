import { GridColumn, GridModel } from "src/app/shared/components/grid/grid-model.model";
import { StorageName } from "src/app/shared/enum/common-enum";


  const Brand: GridColumn = {
    headerName: "Brand",
    field: "brand",
    headerClass: "custom-column-group-cell px-0",
    cellClass: "custom-column-group-cell px-0 ",
    editable: false,
    sortable: true,
    resizable:true,
   }

  const ProductName: GridColumn = {
    headerName: "Product Name",
    field: "name",
    headerClass: "custom-column-group-cell px-0",
    cellClass: "custom-column-group-cell px-0 ",
    editable: false,
    sortable: true,
    resizable:true,
  }

   const ProductCategory: GridColumn = {
    headerName: "Product Category",
    field: "productcategory",
    headerClass: "custom-column-group-cell px-0",
    cellClass: "custom-column-group-cell px-0 ",
    editable: false,
    sortable: true,
    resizable:true,
   }
   const ProductPrice: GridColumn = {
    headerName: "Product Price",
    field: "price",
    headerClass: "custom-column-group-cell px-0",
    cellClass: "custom-column-group-cell px-0 ",
    editable: false,
    sortable: true,
    resizable:true,
   }
  //  const ProductPurchaseDate: GridColumn = {
  //   headerName: "Product Purchase Date",
  //   field: "productPurchaseDate",
  //   headerClass: "custom-column-group-cell px-0",
  //   cellClass: "custom-column-group-cell px-0 ",
  //   editable: false,
  //   sortable: true,
  //   resizable:true,
  //  }
    const ProductImg: GridColumn = {
    headerName: "Product Img",
    field: "image_url",
    headerClass: "custom-column-group-cell px-0",
    cellClass: "custom-column-group-cell px-0 ",
    editable: false,
    sortable: true,
    resizable:true,
   }


  export const ColDefsPurchaseFormTable: GridColumn[] = [
   Brand,
  ProductName,
   ProductCategory,
   ProductPrice,
  //  ProductPurchaseDate,
   ProductImg,
  ];


    export const AgGridDataModelPurchaseForm: GridModel = {
    colDefs: ColDefsPurchaseFormTable,
    // storageName : StorageName.PURCHASE_FORM_DATA_GRID,
    rowData:[],
    // apiUrl :  API_URL_GET_ALL_MANUFACTURINGDEPARTMENT,
  };