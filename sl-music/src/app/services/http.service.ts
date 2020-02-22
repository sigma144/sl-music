import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private serverUrl = 'http://localhost:3000/';  // URL to web api

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string, log: boolean) {
    if (log) console.log(message);
  }

  get<T>(url: string, log?: boolean): Observable<T> {
    return this.http.get<T>(this.serverUrl + url).pipe(
      tap(_ => this.log(`GET ${url}`, log)),
      catchError(this.handleError<T>(`GET ${url}`))
    );
  }

  post<T>(url: string, data: T, log?: boolean): Observable<T> {
    return this.http.post<T>(this.serverUrl + url, data, this.httpOptions).pipe(
      tap((newData: T) => this.log(`POST ${url}\n${newData}`, log)),
      catchError(this.handleError<T>(`POST ${url}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`, true);
      return of(result as T);
    };
  }
}
