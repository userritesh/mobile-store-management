import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LoaderComponent } from './components/loader/loader.component';
import { InputComponent } from './components/form-controls/input/input.component';
import { DropdownComponent } from './components/form-controls/dropdown/dropdown.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/common_card/card.component';
import { GridComponent } from './components/grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { AddItemsPageComponent } from './components/add-items-page/add-items-page.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProductComponent } from '../features/sales/product/product.component';
import { ChartOptionsComponent } from './components/chart-options/chart-options';
import { ReportsModule } from '../features/reports/reports.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ImageInputComponent } from './components/image-input/image-input.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    ModalComponent,
    NotificationsComponent,
    LoaderComponent,
    InputComponent,
    DropdownComponent,
    SidebarComponent,
    CardComponent,
    GridComponent,
    AddItemsPageComponent,
    ButtonComponent,
    ProductComponent,
    ChartOptionsComponent,
    DatePickerComponent,
    ImageInputComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    AgGridModule,
    FormsModule,
     NgxDropzoneModule,

     ],
  exports: [
    FooterComponent,
    SidebarComponent,
    CardComponent,
    GridComponent,
    InputComponent,
    ButtonComponent,
    ChartOptionsComponent,
    ReportsModule
    

  ]
})
export class SharedModule { }
