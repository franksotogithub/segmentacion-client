import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject, BehaviorSubject } from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ReporteAvanceSegmentacion} from "../interfaces/reporte";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesCalidadService {
  private apiUrlCalidad = `${environment.apiEndPointData}calidad`;
  
  private loadedDataReporteIndicadores = new ReplaySubject<any>(1);
  loadedDataReporteIndicadores$ = this.loadedDataReporteIndicadores.asObservable();
  public itemsUbigeos: any[] = [{'ambito': 0, 'codigo': '00', 'text': 'PERU'}];
  public ambito: any= 0;
  public codigo : any ='00';
  
  constructor(private http: HttpClient) { }


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
  reporteIndicadores(parametros: any): Observable<any> {
    let url = `${this.apiUrlCalidad}/reporte_indicadores/${parametros.ambito}/${parametros.codigo}`;
    console.log('url Calidad:',url);
    return this.http.get<any>(url).pipe(
      tap(response => {
        this.loadedDataReporteIndicadores.next(response);
        }),
      catchError(this.handleError<ReporteAvanceSegmentacion[]>(`getDataAvanceCalidad `))
    );
  }
}
