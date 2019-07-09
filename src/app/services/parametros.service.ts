import {Injectable} from '@angular/core';
import {ReplaySubject, BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  public ambitos = [
    {codigo: 0, titulo: "Departamental"},
    {codigo: 1, titulo: "Provincial"},
    {codigo: 2, titulo: "Distrital"},
    {codigo: 3, titulo: "Zonal"}
  ];

  public reportes = [
    {codigo:0,titulo:'Avance de Segmentacion'},
  ]

  public reporte = this.reportes[0];
  public params = {ambito: 0, codigo: '00', text: 'PERU'};
  public paramsCroquisListado = {ambito: 0, codigo: '00'};
  public ambito = this.ambitos[0];
  paramsSource = new BehaviorSubject<any>(this.params);
  paramsCroquisListadoSource = new BehaviorSubject<any>(this.paramsCroquisListado);
  itemsUbigeos: any[] = [{'ambito': 0, 'codigo': '00', 'text': 'PERU'}];

  cambiarParametros(params) {
    if (params.hasOwnProperty('ambito')) {this.params.ambito = params.ambito;  this.ambito= this.ambitos.find(x=>x.codigo==params.ambito); }
    if (params.hasOwnProperty('codigo')) this.params.codigo = params.codigo ;
    if (params.hasOwnProperty('text')) this.params.text = params.text;
    this.paramsSource.next(this.params);
    this.itemsUbigeos = this.itemsUbigeos.filter(x => x.ambito < params.ambito);

    this.itemsUbigeos.push({'ambito': this.params.ambito, 'codigo': this.params.codigo, 'text': this.params.text});
  }

  cambiarParametrosCroquisListado(params) {
    if (params.hasOwnProperty('ambito')) this.paramsCroquisListado.ambito = params.ambito;
    if (params.hasOwnProperty('codigo')) this.paramsCroquisListado.codigo = params.codigo;
    this.paramsCroquisListadoSource.next(this.paramsCroquisListado);
  }


  getItemsUbigeos(): any[] {
    return this.itemsUbigeos;
  }

  getparamsSource(): Observable<any> {
    return this.paramsSource;
  }

  getparamsCroquisListadoSource(): Observable<any> {
    return this.paramsCroquisListadoSource;
  }

  constructor() {


  }


}
