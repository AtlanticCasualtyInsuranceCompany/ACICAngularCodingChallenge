import { QuoteAnalysisService } from './../services/quote-analysis.service';
import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LineOfBusiness } from '../models/line-of-business.model';
import { LineOfBusinessService } from '../services/line-of-business.service';
import { QuoteService } from '../services/quote.service';
import { Quote } from '../models/quote';

@Component({
  selector: 'app-quotes-summary',
  templateUrl: './quotes-summary.component.html',
  styleUrls: ['./quotes-summary.component.css'],
})
export class QuotesSummaryComponent implements OnInit {
  numberOfLinesOfBusinessToDisplay: number = 2;
  topKLinesOfBusiness$?: Observable<{id: number, name: string, quantity: number}[]>;

  constructor(private quoteAnalysisService: QuoteAnalysisService) {}

  ngOnInit() {
    this.topKLinesOfBusiness$ = this.quoteAnalysisService.getTopKLinesOfBusinessByQuoteFrequency(this.numberOfLinesOfBusinessToDisplay);
  }
}
