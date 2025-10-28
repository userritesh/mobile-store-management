import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairListComponent } from './pages/repair-list/repair-list.component';
import { RepairDetailsComponent } from './pages/repair-details/repair-details.component';



@NgModule({
  declarations: [
    RepairListComponent,
    RepairDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RepairsModule { }
