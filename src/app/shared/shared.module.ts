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
    CardComponent

  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    CardComponent
  ]
})
export class SharedModule { }
