import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControllerService } from '../controller.service';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public controllerForm: FormGroup;

  public itemAdded = false;

  public operationMode: 'add' | 'edit' = 'add';

  private currentIndex = -1;

  public isModalOpen = false;
  showNotification: boolean;



  constructor(
    private controllerService: ControllerService
  ) {

    this.controllerForm = new FormGroup({
      serverName: new FormControl(null, [Validators.required]),
      noOfCpus: new FormControl(null, [Validators.required]),
      memory: new FormControl(null, [Validators.required]),
      storage: new FormControl(null, [Validators.required]),
      ipAddress: new FormControl(null, [Validators.required]),
      networkSpeed: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required])
    });


  }

  ngOnInit() {

    this.controllerService.addSuccessObservable.pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: string) => {

      this.showNotification = response ? true : false;

      const that = this;

      setTimeout(() => {

        that.showNotification = false;

      }, 2000);

    });

  }

  submitForm(event): void {

    console.log('submitted', event);
    console.log(this.controllerForm.value);

    if (this.currentIndex > -1) {

      this.controllerService.saveItemAtIndex(this.controllerForm.value, this.currentIndex).pipe(
        takeUntil(this.destroy$)
      ).subscribe((response: any) => {
        this.controllerForm.reset();
        this.itemAdded = true;
        this.currentIndex = -1;
      }, () => {
        this.itemAdded = false;
        this.currentIndex = -1;
      });

    } else {

      this.controllerService.saveItem(this.controllerForm.value).pipe(
        takeUntil(this.destroy$)
      ).subscribe((response: any) => {
        this.controllerForm.reset();
        this.itemAdded = true;
      }, () => {
        this.itemAdded = false;
      });

    }

  }

  updateElement(event: { index: number, operation: string }): void {

    if (event && event.operation === 'edit') {

      this.controllerService.getItemAtIndex(event.index).pipe(
        takeUntil(this.destroy$)
      ).subscribe((itemResponse: any) => {
        this.currentIndex = event.index;
        this.controllerForm.patchValue(itemResponse);
        this.operationMode = 'edit';
      });

    } else if (event && event.operation === 'delete') {

      this.controllerService.deleteItemAtIndex(event.index).pipe(
        takeUntil(this.destroy$)
      ).subscribe((response: any) => {
        this.itemAdded = response ? true : false;
      });

    }

  }

  openModal(event: number): void {

    if (event > -1) {

      this.isModalOpen = true;
      this.currentIndex = event;

    }

  }

  closeModal(): void {

    console.log('closeModal');
    this.isModalOpen = false;

  }

}
