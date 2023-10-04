import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private quoteUrl = 'api/recentQuotes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET quotes from the server */
  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.quoteUrl).pipe(
      tap(_ => this.log('fetched quotes')),
      catchError(this.handleError<Quote[]>('getQuotes', []))
    );
  }

  getQuotesByLineOfBusinessId(lineOfBusinessId: number): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.quoteUrl).pipe(
      tap(_ => this.log('fetched quotes')),
      map(quotes => quotes.filter(quote => quote.lineOfBusinessId === lineOfBusinessId)),
      catchError(this.handleError<Quote[]>('getQuotesByLineOfBusinessId', []))
    );
}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a QuoteService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuoteService: ${message}`);
  }
}
