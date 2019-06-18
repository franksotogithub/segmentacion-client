import {Injectable} from '@angular/core';
import {ReplaySubject, BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {


  public params = {ambito: 0, codigo: '00'};
  paramsSource = new BehaviorSubject<any>(this.params);


  cambiarParametros(params) {
    if(params.hasOwnProperty('ambito'))this.params.ambito = params.ambito;
    if(params.hasOwnProperty('codigo'))this.params.codigo = params.codigo ;
    this.paramsSource.next(this.params);
  }

  getparamsSource(): Observable<any> {
    return this.paramsSource;
  }

  constructor() {


  }


}
