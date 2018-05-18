import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


//import { Observable } from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from './../inventory/categories/category.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'api_token': ''
  })
};



@Injectable()
export class CategoryService {

  //private   categoriesUrl = 'http://192.168.0.28/textiles-back/public/index.php/categories';
  private categoriesUrl = 'http://localhost:8000/categories';

  constructor(private http: HttpClient) { }

   getCategories(): Observable<Category[]> {
     console.log(localStorage.getItem('api_token'));
     httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.get<Category[]>(this.categoriesUrl, httpOptions)
      .pipe(
        tap(categories => this.log('fetchet categories')),
        catchError(this.handleError('getCategories', []))
      ); //Captura Error
  }

  /* GET: Captura el dato por ID, sino lo encuentra genera error 404 */
  getCategory(id: number): Observable<Category> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const url = '${this.categoriesUrl}/${id}';
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log('fetched category id=${id}')),
      catchError(this.handleError<Category>('getCategory id=${id}'))
    );
  }

    /** PUT: Actualiza los daots del categoryo del servidor*/
  updateCategory (category: Category): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.put(this.categoriesUrl + '/' + category.id, category, httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

    /** POST: Crea los datos del categoryo del servidor */
  addCategory (category: Category): Observable<Category> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions).pipe(
      tap((category: Category) => this.log('added category w/ id=${category.id}')),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

    /** DELETE: Borra los datos del categoryo del servidor por ID */
  deleteCategory (category: Category | number): Observable<Category> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.categoriesUrl}/${id}`;

    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => this.log('deleted category id=${id}')),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

/*
    /* GET: Se consulta los datos del categoryo por medio del Buscador
  searchCategories(term: string): Observable<Category[]> {
    if (!term.trim()) {
      // Si no existe dato, muestra vacío
      return of([]);
    }
    return this.http.get<Category[]>('api/categories/?name=${term}').pipe(
      tap(_ => this.log('found categories matching "${term}"')),
      catchError(this.handleError<Category[]>('searchCategories', []))
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

  

