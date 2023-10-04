import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Quote } from '../models/quote';
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
      switchMap(quotes => {
        return this.lineOfBusinessService.getLinesOfBusiness().pipe(
          tap(_ => this.log('fetched lines of business')),
          catchError(this.handleError<LineOfBusiness[]>('getLinesOfBusiness', [])),
          map(linesOfBusiness => {
            let lineFrequencyRecord = this.getLineFrequencyRecord(quotes);
            return this.getLinesOfBusinessSortedByQuoteFrequencyDescending(linesOfBusiness, lineFrequencyRecord, k)
          })
        );
      })
    );
  }

  private getLineFrequencyRecord(quotes: Quote[]) {
    return quotes.reduce((record: Record<number, number>, quote) => {
      if (quote.lineOfBusinessId in record) {
        record[quote.lineOfBusinessId]++;
      } else {
        record[quote.lineOfBusinessId] = 1;
      }
      return record;
    }, {});
  }

  private getLinesOfBusinessSortedByQuoteFrequencyDescending(lines: LineOfBusiness[], record: Record<number, number>, k: number) {
    return lines
      .sort((a, b) => (record[b.id] || 0) - (record[a.id] || 0))
      .slice(0, k)
      .map(line => ({
          id: line.id,
          name: line.name,
          quantity: record[line.id] || 0
        })
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
