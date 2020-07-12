import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControllerService } from './services/controller.service';
import { DatagridComponent } from './datagrid/datagrid.component';
import { ModalComponent } from './shared-module/modal/modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DatagridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,

    ReactiveFormsModule,
    NgbModule,
    // ChartModule
  ],
  providers: [
    ControllerService,
    NgbActiveModal
  ],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
