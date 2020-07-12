import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ControllerServerItem } from '../../interfaces/controller-item.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControllerService } from '../../services/controller.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() isChartOpen: boolean;
  @Input() index: number;

  @Output() isChartOpenChange: EventEmitter<boolean> = new EventEmitter();

  public chart: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private controllerService: ControllerService) { }

  ngOnInit() {

    this.controllerService.getItemAtIndex(this.index).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: ControllerServerItem) => {

      // get chart related data and manouvre.

    }, () => {

      // error handling

    });

    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          type: 'pie',
          name: 'Browser share',
          data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
            },
            ['Safari', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7]
          ]
        }
      ]
    });

  }

  public close(): void {

    this.isChartOpenChange.emit(false);

  }

}
