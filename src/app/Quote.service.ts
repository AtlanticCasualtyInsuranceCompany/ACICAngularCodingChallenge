import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Quote } from './Quote';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class QuoteService {

    private recentQuotesUrl = 'api/recentQuotes';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    /** GET recent quotes from the server */
    getRecentQuotes(): Observable<Quote[]> {
        return this.http.get<Quote[]>(this.recentQuotesUrl)
            .pipe(
                tap(_ => this.log('fetched recent quotes')),
                catchError(this.handleError<Quote[]>('getRecentQuotes', []))
            );
    }

    /** GET line of business quotes by id. Will 404 if id not found */
    getRecentQuotesByLineOfBusinessId(lineOfBusinessId: number): Observable<Quote[]> {
        const url = `${this.recentQuotesUrl}?lineOfBusiness=${lineOfBusinessId}`;
        return this.http.get<Quote[]>(url).pipe(
            tap(_ => this.log(`fetched lineOfBusiness quotes lineOfBusiness=${lineOfBusinessId}`)),
            catchError(this.handleError<Quote[]>(`getRecentQuotesByLineOfBusinessId lineOfBusiness=${lineOfBusinessId}`))
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

    /** Log a LineOfBusinessService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`LineOfBusinessService: ${message}`);
    }
}
