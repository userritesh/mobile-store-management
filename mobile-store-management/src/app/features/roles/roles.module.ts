import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesListComponent } from './roles-list.component';
import { RolesEditComponent } from './roles-edit.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: RolesListComponent },
      { path: 'edit/:id', component: RolesEditComponent }
    ])
  ]
})
export class RolesModule {}
