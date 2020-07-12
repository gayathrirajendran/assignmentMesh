import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ControllerService } from '../controller.service';
import { ControllerServerItem } from '../interfaces/controller-item.interface';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnChanges {

  @Input() isItemAdded: boolean;

  @Output() updateIndex: EventEmitter<{ index: number, operation: string}>;
  @Output() openModalEvent: EventEmitter<number>;

  public listItems: ControllerServerItem[];

  public colNames: string[];
  constructor(private controllerService: ControllerService) {

    this.isItemAdded = false;

    this.colNames = ['S.No', 'Server name', 'No of CPUs', 'Memory', 'Storage', 'Ip Address', 'NetworkSpeed', 'Location', 'Actions'];

    this.updateIndex = new EventEmitter();

    this.openModalEvent = new EventEmitter();

  }

  ngOnChanges(): void {

    if (this.isItemAdded) {

      this.controllerService.getStorage().pipe(
      ).subscribe((response: ControllerServerItem[]) => this.listItems = response);

    }

  }

  editItem(editIndex: number): void {

    this.updateIndex.emit({ index: editIndex, operation: 'edit' });

  }

  deleteItem(deleteIndex: number): void {

    this.updateIndex.emit({ index: deleteIndex, operation: 'delete' });

  }

  openModal(index: number): void {

    this.openModalEvent.emit(index);

  }

}
