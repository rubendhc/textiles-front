import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../../data';
import { Negative } from './negativeSold';


//import { Observable } from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'api_token': ''
  })
};


@Injectable()
export class NegativeSoldService {

   //private negativeUrl = 'http://192.168.0.28/textiles-back/public/index.php/negatives';
  private negativeUrl = 'http://localhost:8000/negatives';

  constructor(private http: HttpClient) { }

  getNegatives(): Observable<Negative[]> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    console.log(httpOptions.headers);
    return this.http.get<Negative[]>(this.negativeUrl,httpOptions)
      .pipe(
        tap(negatives => this.log('fetchet negatives')),
        catchError(this.handleError('getNegative', []))
      ); //Captura Error

  }

  /* GET: Captura el dato por ID, sino lo encuentra genera error 404 */
  getNegative(id: number): Observable<Negative> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const url = this.negativeUrl+'/'+id;
    return this.http.get<Negative>(url, httpOptions).pipe(
      tap(_ => this.log('fetched negative id=${id}')),
      catchError(this.handleError<Negative>('getNegative id=${id}'))
    );
  }

    /** PUT: Actualiza los daots del negativeo del servidor*/
  updateNegative (negative: Negative): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.put(this.negativeUrl + '/' + negative.id, negative, httpOptions).pipe(
      tap(_ => this.log(`updated negative id=${negative.id}`)),
      catchError(this.handleError<any>('updateNegative'))
    );
  }

    /** POST: Crea los datos del negativeo del servidor */
  addNegative (negative: Negative): Observable<Negative> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.post<Negative>(this.negativeUrl, negative, httpOptions).pipe(
      tap((negative: Negative) => this.log('added negative w/ id=${negative.id}')),
      catchError(this.handleError<Negative>('addNegative'))
    );
  }

    /** DELETE: Borra los datos del negativeo del servidor por ID */
  deleteNegative (negative: Negative | number): Observable<Negative> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const id = typeof negative === 'number' ? negative : negative.id;
    const url = `${this.negativeUrl}/${id}`;

    return this.http.delete<Negative>(url, httpOptions).pipe(
      tap(_ => this.log('deleted negative id=${id}')),
      catchError(this.handleError<Negative>('deleteNegative'))
    );
  }

/*
    /* GET: Se consulta los datos del negativeo por medio del Buscador
  searchNegatives(term: string): Observable<Negative[]> {
    if (!term.trim()) {
      // Si no existe dato, muestra vacío
      return of([]);
    }
    return this.http.get<Negative[]>('api/negatives/?name=${term}').pipe(
      tap(_ => this.log('found negatives matching "${term}"')),
      catchError(this.handleError<Negative[]>('searchNegatives', []))
    );
  }
  */

  /*
  * Manejo cuando el HTTP falla
  * Permite a la aplicación continuar
  * @param operation - nombre de la operación que fallo
  * @param result - valor opcional para devolver la respuesta al Observable
  */
  private handleError<T> (operation = 'operation', result?:T){
    return (error: any): Observable<T> => {

      //TODO: envia el error a una infraestructura remoto
      console.error(error);

      //TODO: transformar el error para consumir
      this.log(' ${operation} failed: ${error.message} ');

      //TODO: mantener la app corriendo retornando un resultado vacío
      return of(result as T);
    }
  }

  private log(message: string){}

}
