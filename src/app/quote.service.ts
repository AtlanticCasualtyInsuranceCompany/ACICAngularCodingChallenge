import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Quote } from './Quote';

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
    return this.http.get<Quote[]>(this.quoteUrl)
  }
}
