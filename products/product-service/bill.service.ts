import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../../data';
import { Bill } from '../store/product-bill/bill.model';
import { BillProduct } from '../store/product-bill/billProduct.model';


//import { Observable } from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'api_token': ''
  })
};



@Injectable({
  providedIn: 'root'
})
export class BillService {

	//private billUrl = 'http://192.168.0.28/textiles-back/public/index.php/sales';
  	private billUrl = 'http://localhost:8000/bill';
    private billProductUrl = 'http://localhost:8000/sales';

  constructor(private http: HttpClient) { }

  getBills(): Observable<Bill[]> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.get<Bill[]>(this.billUrl,httpOptions)
      .pipe(
        tap(bill => this.log('fetchet bill')),
        catchError(this.handleError('getBills', []))
      ); //Captura Error

  }

  /* GET: Captura el dato por ID, sino lo encuentra genera error 404 */
  getBill(id: number): Observable<Bill> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const url = this.billUrl+'/'+id;
    return this.http.get<Bill>(url, httpOptions).pipe(
      tap(_ => this.log('fetched bill id=${id}')),
      catchError(this.handleError<Bill>('getBill id=${id}'))
    );
  }

    /** PUT: Actualiza los daots del billo del servidor*/
  updateBill (bill: Bill): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.put(this.billUrl + '/' + bill.id, bill, httpOptions).pipe(
      tap(_ => this.log(`updated bill id=${bill.id}`)),
      catchError(this.handleError<any>('updateBill'))
    );
  }

    /** POST: Crea los datos del billo del servidor */
  addBill (bill: Bill): Observable<Bill> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.post<Bill>(this.billUrl, bill, httpOptions).pipe(
      tap((bill: Bill) => this.log('added bill w/ id=${bill.id}')),
      catchError(this.handleError<Bill>('addBill'))
    );
  }

    /** DELETE: Borra los datos del billo del servidor por ID */
  deleteBill (bill: Bill | number): Observable<Bill> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const id = typeof bill === 'number' ? bill : bill.id;
    const url = `${this.billUrl}/${id}`;

    return this.http.delete<Bill>(url, httpOptions).pipe(
      tap(_ => this.log('deleted bill id=${id}')),
      catchError(this.handleError<Bill>('deleteBill'))
    );
  }


  getBillTest(): Observable<Bill> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const url = 'http://localhost:8000/bill2';
    return this.http.get<Bill>(url, httpOptions).pipe(
      tap(_ => this.log('fetched bill id=${id}')),
      catchError(this.handleError<Bill>('getBill id=${id}'))
    );
  }


//BillProduct (Pivote)
/*********************************************************************************************/

  getBillProducts(): Observable<BillProduct[]> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.get<BillProduct[]>(this.billProductUrl,httpOptions)
      .pipe(
        tap(billProduct => this.log('fetchet billProduct')),
        catchError(this.handleError('getBillProducts', []))
      ); //Captura Error

  }

  /* GET: Captura el dato por ID, sino lo encuentra genera error 404 */
  getBillProduct(id: number): Observable<BillProduct> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const url = this.billProductUrl+'/'+id;
    return this.http.get<BillProduct>(url, httpOptions).pipe(
      tap(_ => this.log('fetched billProduct id=${id}')),
      catchError(this.handleError<BillProduct>('getBill id=${id}'))
    );
  }

    /** PUT: Actualiza los daots del billProducto del servidor*/
  updateBillProduct (billProduct: BillProduct): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.put(this.billProductUrl + '/' + billProduct.id, billProduct, httpOptions).pipe(
      tap(_ => this.log(`updated billProduct id=${billProduct.id}`)),
      catchError(this.handleError<any>('updateBill'))
    );
  }

    /** POST: Crea los datos del billProducto del servidor */
  addBillProduct (billProduct: BillProduct): Observable<BillProduct> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    return this.http.post<BillProduct>(this.billProductUrl, billProduct, httpOptions).pipe(
      tap((billProduct: BillProduct) => this.log('added billProduct w/ id=${billProduct.id}')),
      catchError(this.handleError<BillProduct>('addBill'))
    );
  }

    /** DELETE: Borra los datos del billProducto del servidor por ID */
  deleteBillProduct (billProduct: BillProduct | number): Observable<BillProduct> {
    httpOptions.headers = httpOptions.headers.set('api_token', localStorage.getItem('api_token'));
    const id = typeof billProduct === 'number' ? billProduct : billProduct.id;
    const url = `${this.billProductUrl}/${id}`;

    return this.http.delete<BillProduct>(url, httpOptions).pipe(
      tap(_ => this.log('deleted billProduct id=${id}')),
      catchError(this.handleError<BillProduct>('deleteBill'))
    );
  }


/*
    /* GET: Se consulta los datos del billo por medio del Buscador
  searchBills(term: string): Observable<Bill[]> {
    if (!term.trim()) {
      // Si no existe dato, muestra vacío
      return of([]);
    }
    return this.http.get<Bill[]>('api/bill/?name=${term}').pipe(
      tap(_ => this.log('found bill matching "${term}"')),
      catchError(this.handleError<Bill[]>('searchBills', []))
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
