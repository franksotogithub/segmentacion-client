import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  apiEndPointData = environment.apiEndPointData;

  private loadedDataSource = new ReplaySubject<Response[]>(1);
  loadedData$ = this.loadedDataSource.asObservable();

  constructor(private http: HttpClient) {
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

  getDataAvanceSegmentacion(ambito): Observable<any> {
    const url = `${this.apiEndPointData}croquis_listado_api/reportes/reporte_avance_segmentacion/${ambito}`;
    return this.http.get<Response[]>(url).pipe(
      tap(response => {
        this.loadedDataSource.next(response);
      }),
      catchError(this.handleError<Response[]>(`getIndicadorData `))
    );

  }
}
