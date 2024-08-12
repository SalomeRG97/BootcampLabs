import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private dataSubject = new BehaviorSubject<any>(null);
  private dataSubj = new BehaviorSubject<{ correo: string; codigo: string }>({
    correo: '',
    codigo: '',
  });
  data$ = this.dataSubject.asObservable();
  dataSub$ = this.dataSubj.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }

  setDataCambio(correo: any, codigo: any) {
    this.dataSubj.next({ correo, codigo });
  }
}
