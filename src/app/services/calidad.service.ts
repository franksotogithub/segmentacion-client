import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject, BehaviorSubject } from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ReporteAvanceSegmentacion} from "../interfaces/reporte";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class CalidadService {

  private apiUrlCalidad = `${environment.apiEndPointData}calidad`;
  private loadedDataAvanceCalidad = new ReplaySubject<any>(1);
  loadedDataAvanceCalidad$ = this.loadedDataAvanceCalidad.asObservable();

  private loadedDataAeuMuestraCalidad = new ReplaySubject<any>(1);
  loadedDataAeuMuestraCalidad$ = this.loadedDataAeuMuestraCalidad.asObservable();


  private loadedDataVivMuestraCalidad = new ReplaySubject<any>(1);
  loadedDataVivMuestraCalidad$ = this.loadedDataVivMuestraCalidad.asObservable();

  private loadedDataIndAeuMuestraCalidad = new BehaviorSubject <any>('00');
  loadedDataIndAeuMuestraCalidad$ = this.loadedDataIndAeuMuestraCalidad.asObservable();

  public itemsUbigeos: any[] = [{'ambito': 0, 'codigo': '00', 'text': 'PERU'}];


  public ambito: any= 0;
  public codigo : any ='00';

  public aeu = new ReplaySubject<any>(1);
  public aeu$ =  this.aeu.asObservable();
  
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

  constructor(private http: HttpClient) {
  }

  getDataAvanceCalidad(parametros) {

    let url = `${this.apiUrlCalidad}/reporte_avance_calidad/${parametros.ambito}/${parametros.codigo}`;
    console.log('url Calidad:',url);
    return this.http.get<any>(url).pipe(
      tap(response => {
        
        this.loadedDataAvanceCalidad.next(response);
      }),
      catchError(this.handleError<ReporteAvanceSegmentacion[]>(`getDataAvanceCalidad `))
    );
  }

  getDataAeuMuestraCalidad(idzona) {
    const url = `${this.apiUrlCalidad}/lista_aeu_muestra_calidad/${idzona}`;
    return this.http.get<any>(url).pipe(
      tap(response => {
        this.loadedDataAeuMuestraCalidad.next(response);
      }),
      catchError(this.handleError<ReporteAvanceSegmentacion[]>(`getDataAeuMuestraCalidad `))
    );
  }

  getDataVivMuestraCalidad(idaeu) {
    const url = `${this.apiUrlCalidad}/viv_aeu_muestra_calidad/${idaeu}`;
    return this.http.get<any>(url).pipe(
      tap(response => {
        this.loadedDataVivMuestraCalidad.next(response);
      }),
      catchError(this.handleError<ReporteAvanceSegmentacion[]>(`getDataVivMuestraCalidad `))
    );
  }

  /*detalle_indicadores_aeu_muestra_calidad*/
  getDataIndAeuMuestraCalidad(idaeu) {
    const url = `${this.apiUrlCalidad}/detalle_indicadores_aeu_muestra_calidad/${idaeu}`;
    return this.http.get<any>(url).pipe(
      tap(response => {
        this.loadedDataIndAeuMuestraCalidad.next(response);
      }),
      catchError(this.handleError<ReporteAvanceSegmentacion[]>(`getDataVivMuestraCalidad `))
    );
  }

  generarMuestraAeuCalidad(idzona): Observable<any> {
    const url = `${this.apiUrlCalidad}/generar_muestra_aeu_calidad/${idzona}`;
    return this.http.put(url, {}, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${idzona}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  evaluarZonaCalidad(idzona): Observable<any> {
    const url = `${this.apiUrlCalidad}/evaluar_zona_calidad/${idzona}`;
    return this.http.put(url, {}, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${idzona}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  actualizarIndicadores(idaeu, aeu: any): Observable<any> {
    const url = `${this.apiUrlCalidad}/actualizar_indicadores/${idaeu}`;
    return this.http.put(url, aeu, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${idaeu}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }



}
