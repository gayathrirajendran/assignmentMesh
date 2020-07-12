import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControllerService } from '../../services/controller.service';
import { ControllerServerItem } from '../../interfaces/controller-item.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {

  @Input() isModalOpen: boolean;
  @Input() index: number;

  @Output() isModalOpenChange: EventEmitter<boolean> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private controllerService: ControllerService) { }

  ngOnChanges(): void {

    this.modalService.open(ModalComponent);

    if (this.index > -1) {

      this.controllerService.getItemAtIndex(this.index).subscribe((response: ControllerServerItem) => {

      });

    }

  }

  closeModal(event: any): void {

    this.activeModal.dismiss('Cross click');

    this.isModalOpenChange.emit(event);

  }

}
