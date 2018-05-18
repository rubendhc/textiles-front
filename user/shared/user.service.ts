import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'api_token': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private userUrl = 'http://192.168.0.28/textiles-back/public/index.php/users';
  private userUrl = 'http://localhost:8000/users'; 

  constructor(private http: HttpClient) { }



  userAuth(userName, password){
  	let data = '{ "username":'+userName+','+'"password":'+password+'}';
  	let reqHeader = new HttpHeaders({'Content-type': 'application/json'});
  	return this.http.post(this.userUrl+'/login',data,{headers:reqHeader});
  }

   userAuth2 (user: User): Observable<User>  {
    return this.http.post<User>(this.userUrl+'/login', user, httpOptions);

   }

    getUser(id: number): Observable<User> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const url = this.userUrl+'/'+id;
    return this.http.get<User>(url, httpOptions).pipe(
      tap(_ => this.log('fetched product id=${id}')),
      catchError(this.handleError<User>('getUser id=${id}'))
    );
  }

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
