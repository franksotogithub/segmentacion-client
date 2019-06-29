import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from "rxjs";
import {catchError, tap, map} from 'rxjs/operators';
import {Usuario} from "../interfaces/usuario";
import {environment} from "src/environments/environment";
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosDataSource = new ReplaySubject<Usuario[]>(1);
  usuariosDataSource$ = this.usuariosDataSource.asObservable();
  private usuarioDataSource = new ReplaySubject<Usuario>(1);
  usuarioDataSource$ = this.usuarioDataSource;
  private apiUrlUsuarios = `${environment.apiEndPointData}users`;

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

  getUsuarios(): Observable<any> {

    return this.http.get<any>(this.apiUrlUsuarios)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getUsuarios', []))
      );
  }

  addUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(this.apiUrlUsuarios, usuario, httpOptions).pipe(
      tap((u: Usuario) => console.log(`added product w/ id=${u.id}`)),
      catchError(this.handleError<Usuario>('addProduct'))
    );

  }

  getUsuario(id) {
    const url = `${this.apiUrlUsuarios}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
    );
  }

  updateUsuario(id, usuario): Observable<any> {
    const url = `${this.apiUrlUsuarios}/${id}`;
    return this.http.put(url, usuario, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteUsuario(id): Observable<any> {
    const url = `${this.apiUrlUsuarios}/${id}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Usuario>('deleteProduct'))
    );
  }


  constructor(private http: HttpClient) {

  }


}
