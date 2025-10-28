import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
 @Input() rowData: any[] = [];
   @Input() dataModel: any;
  @Output() rowClicked = new EventEmitter<any>();

  pagination = true;
  paginationPageSize = 10;
  @Output() gridReadyEvent = new EventEmitter<any>();
  columnDefs: any;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataModel'] && this.dataModel) {
      this.rowData = this.dataModel.rowData || [];
      this.columnDefs = this.dataModel.columns || [];
      this.pagination = this.dataModel.pagination ?? true;
      this.paginationPageSize = this.dataModel.pageSize ?? 100;
    }
  }
  rowclick(arg: any) {
    this.rowClicked.emit(arg); 
  }
}
