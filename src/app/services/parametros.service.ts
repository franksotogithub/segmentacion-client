import {Injectable} from '@angular/core';
import {ReplaySubject, BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {


  public params = {ambito: 0, codigo: '00' ,text:'PERU'};
  paramsSource = new BehaviorSubject<any>(this.params);
  itemsUbigeos: any[] = [{'ambito': 0, 'codigo': '00','text':'PERU'}];
  //itemsUbigeos: any[] = [];
  cambiarParametros(params) {
    if (params.hasOwnProperty('ambito')) this.params.ambito = params.ambito;
    if (params.hasOwnProperty('codigo')) this.params.codigo = params.codigo;
    if (params.hasOwnProperty('text')) this.params.text = params.text;
    this.paramsSource.next(this.params);
    this.itemsUbigeos = this.itemsUbigeos.filter(x => x.ambito < params.ambito);
    /*if(params.codigo!=='00'){

    }*/

    this.itemsUbigeos.push({'ambito': this.params.ambito, 'codigo': this.params.codigo, 'text': this.params.text});
  }

  getItemsUbigeos(): any[] {
    return this.itemsUbigeos;
  }

  getparamsSource(): Observable<any> {
    return this.paramsSource;
  }

  constructor() {


  }


}
