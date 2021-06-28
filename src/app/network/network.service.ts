import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log("An error occurred: " + error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);

    }

    return throwError(error);
  }

  private extractData(res: any) {
    let body = res;
    return body || {}
  }

  public getData(url: string): Observable<any>{
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  public sendData(url: any, rawData: any): Observable<any> {
    return this.http.post(url, JSON.stringify(rawData)).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

}
