import { Injectable } from '@angular/core';
import { ControllerItem, ControllerServerItem } from '../interfaces/controller-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  private controllerStorage: ControllerServerItem[] = [];

  private addSuccessEvent: BehaviorSubject<string> = new BehaviorSubject('');
  public addSuccessObservable = this.addSuccessEvent.asObservable();

  constructor() { }

  public saveItem(item: ControllerItem): Observable<any> {

    return Observable.create(observer => {

      const newId: string = Math.random().toString(36).slice(2);
      const itemToBeSaved = { ...item, id: newId };
      if (item) {
        this.controllerStorage.push(itemToBeSaved);
        this.addSuccessEvent.next(newId);
      } else {
        this.addSuccessEvent.next('');
      }
      observer.next(newId);
    });

  }

  public saveItemAtIndex(item: ControllerItem, index: number): Observable<any> {

    return Observable.create(observer => {

      const newId: string = Math.random().toString(36).slice(2);
      const itemToBeSaved = { ...item, id: newId };
      if (item) {
        this.controllerStorage[index] = itemToBeSaved;
        this.addSuccessEvent.next(newId);
      } else {
        this.addSuccessEvent.next('');
      }
      observer.next(newId);
    });

  }

  public getStorage(): Observable<ControllerServerItem[]> {

    return Observable.create(observer => {
      observer.next(this.controllerStorage);
    });

  }

  public getItemAtIndex(index: number): Observable<ControllerServerItem> {

    return Observable.create(observer => {
      observer.next(this.controllerStorage[index]);
    });

  }

  public deleteItemAtIndex(index: number): Observable<ControllerServerItem> {

    return Observable.create(observer => {

      const itemToBeDeleted = this.controllerStorage[index];
      this.controllerStorage.splice(index, 1);
      observer.next(itemToBeDeleted.id);

    });

  }
}
