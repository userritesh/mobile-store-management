import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { SalesModule } from './features/sales/sales.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { ChartOptionsComponent } from './shared/components/chart-options/chart-options';
import { LoginFormComponent } from './layout/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    SalesModule,
    HttpClientModule,
    ApolloModule,
    NgbModule,
    AgGridModule,
    ToastrModule.forRoot({ 
      positionClass: 'toast-top-right', 
      preventDuplicates: true 
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
