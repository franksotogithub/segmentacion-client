import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ReporteAvanceSegmentacion} from '../interfaces/reporte';
import {ParametrosService} from 'src/app/services/parametros.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  apiEndPointData = environment.apiEndPointData;

  private loadedDataSource = new ReplaySubject<ReporteAvanceSegmentacion[]>(1);
  loadedData$ = this.loadedDataSource.asObservable();
  private loadedDataMapaSource = new ReplaySubject<any>(1);
  loadedDataMapa$ = this.loadedDataMapaSource.asObservable();

  private paramsSource = new ReplaySubject<any>(1);
  paramsSource$ = this.paramsSource.asObservable();

  private rangos = [
    {'min_valor': 0, 'max_valor': 20},
    {'min_valor': 20, 'max_valor': 40},
    {'min_valor': 40, 'max_valor': 60},
    {'min_valor': 60, 'max_valor': 80},
    {'min_valor': 80, 'max_valor': 100},
  ];
  private colores = [

    {id: 4, color: '#2ecc71'},
    {id: 3, color: '#f1c40f'},
    {id: 2, color: '#f39c12'},
    {id: 1, color: '#e67e22'},
    {id: 0, color: '#e74c3c'},
  ];

  private colorGris = '#9c9c9c';

  private parametros: any={ ambito:0,codigo:'00'} ;


  constructor(private http: HttpClient ,private parametrosServices : ParametrosService) {


    this.parametrosServices.getparamsSource().subscribe(parametros=>{

      console.log('parametros>>>',parametros);
      this.getDataAvanceSegmentacion(parametros).subscribe(res=>{console.log('res>>>',res);});
    });
  }


  private formatDataMapa(response: ReporteAvanceSegmentacion[]) {
    let res = {};
    let datos = response.map(x => {
      return {'codigo': x.codigo, 'valor': x.porcent_segm};
    });
    res['data'] = this.getColorPorDato(datos, this.rangos, this.colores);
    res['ambito'] =this.parametros.ambito;
    return res;
  }


  getColorPorDato(data, rangos, colores) {
    let datax = [];
    let valor;
    let codigo = '';
    let j = 0;
    let color = '';

    data.forEach(el => {
      codigo = el.codigo;
      valor = parseFloat(el.valor);
      if (!(valor == null || valor == undefined)) {
        for (j = 0; j < rangos.length; j++) {
          if (rangos[j].min_valor <= valor && rangos[j].max_valor >= valor) {
            color = colores.find(x => x.id === j).color;
            el['estrato'] = j;
            el['color'] = color;
          }
        }
      } else {
        el['estrato'] = -1;
        el['color'] = this.colorGris;
      }
      datax.push(el);
    });
    return datax;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getDataAvanceSegmentacion(parametros): Observable<any>
  {
    let url='';


    if(parametros.codigo!=='00' && parametros.codigo!==undefined){
      url = `${this.apiEndPointData}croquis_listado_api/reportes/reporte_avance_segmentacion/${parametros.ambito}/${parametros.codigo}`;
    }
    else{
      url = `${this.apiEndPointData}croquis_listado_api/reportes/reporte_avance_segmentacion/${parametros.ambito}`;
    }


    return this.http.get<ReporteAvanceSegmentacion[]>(url).pipe(
      tap(response => {

        this.loadedDataSource.next(response);
        this.loadedDataMapaSource.next(this.formatDataMapa(response));
      }),
      catchError(this.handleError<ReporteAvanceSegmentacion[]>(`getIndicadorData `))
    );
  }

  getLoadedDataMapaSource(): Observable<any> {
    return this.loadedDataMapaSource;
  }

  getLoadedDataSource():Observable<any>{
    return this.loadedDataSource;
  }


}
