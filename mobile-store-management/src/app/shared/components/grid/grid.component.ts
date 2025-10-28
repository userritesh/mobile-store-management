import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { GridModel } from './grid-model.model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() rowData: any[] = [];
  @Input() dataModel!: GridModel;

  @Output() rowClicked = new EventEmitter<any>();
  @Output() gridReadyEvent = new EventEmitter<any>();

  columnDefs: any[] = [];
  pagination = true;
  paginationPageSize = 10;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataModel'] && this.dataModel) {
      this.columnDefs = this.dataModel.columns || [];
      this.pagination = this.dataModel.pagination ?? true;
      this.paginationPageSize = this.dataModel.pageSize ?? 10;
      console.log('columnDefs:', this.columnDefs);
    console.log('rowData:', this.rowData);
    }
  }

  rowclick(arg: any) {
    this.rowClicked.emit(arg);
  }
}
