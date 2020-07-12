import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';
import { ModalComponent } from './modal/modal.component';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [MapComponent, ModalComponent, ChartComponent],
  exports: [
    MapComponent,
    ModalComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    // GoogleMapsModule
  ]
})
export class SharedModuleModule { }
