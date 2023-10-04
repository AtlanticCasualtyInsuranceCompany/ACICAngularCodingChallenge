import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Quote } from '../models/quote.model';
import { LineOfBusinessService } from './line-of-business.service';
import { QuoteService } from './quote.service';
import { LineOfBusiness } from '../models/line-of-business.model';

@Injectable({
  providedIn: 'root'
})
export class LineOfBusinessAnalysisService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private lineOfBusinessService: LineOfBusinessService,
    private quoteService: QuoteService) { }

  /** GET top K lines of business ordered by quote frequency (descending) */
  getTopKLinesOfBusinessByQuoteFrequency(k: number): Observable<{id: number; name: string; quantity: number}[]> {
    return this.quoteService.getQuotes().pipe(
      tap(_ => this.log('fetched quotes')),
      catchError(this.handleError<Quote[]>('getQuotes', [])),
      map(quotes => this.getLineOfBusinessFrequencyRecord(quotes)),
      map(record => ({
          ids: this.getLinesOfBusinessSortedByQuoteFrequencyDescending(record, k),
          record
      })),
      switchMap(({ ids, record }) =>
          forkJoin(ids.map(id =>
              this.lineOfBusinessService.getLineOfBusinessNo404(id).pipe(
                  tap(_ => this.log(`fetched line of business id=${id}`)),
                  catchError(this.handleError<LineOfBusiness>(`getLineOfBusiness id=${id}`)),
                  map(lineOfBusiness => ({
                      id: lineOfBusiness.id,
                      name: lineOfBusiness.name,
                      quantity: record[id]
                  }))
              )
          ))
      )
  );
}


  private getLineOfBusinessFrequencyRecord(quotes: Quote[]) {
    return quotes.reduce((record: Record<number, number>, quote) => {
      if (quote.lineOfBusinessId in record) {
        record[quote.lineOfBusinessId]++;
      } else {
        record[quote.lineOfBusinessId] = 1;
      }
      return record;
    }, {});
  }

  private getLinesOfBusinessSortedByQuoteFrequencyDescending(record: Record<number, number>, k: number) {
    return Object.entries(record)
      .sort(([, aFrequency], [, bFrequency]) => bFrequency - aFrequency) // descending
      .slice(0, k)
      .map(([id]) => +id);
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
