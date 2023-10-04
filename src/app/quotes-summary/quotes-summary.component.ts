import { LineOfBusinessAnalysisService } from './../services/line-of-business-analysis.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quotes-summary',
  templateUrl: './quotes-summary.component.html',
  styleUrls: ['./quotes-summary.component.css'],
})
export class QuotesSummaryComponent implements OnInit {
  numberOfLinesOfBusinessToDisplay: number = 2;
  topKLinesOfBusiness$: Observable<{id: number, name: string, quantity: number}[]> | undefined;

  constructor(private lineOfBusinessAnalysisService: LineOfBusinessAnalysisService) {}

  ngOnInit() {
    this.topKLinesOfBusiness$ = this.lineOfBusinessAnalysisService.getTopKLinesOfBusinessByQuoteFrequency(this.numberOfLinesOfBusinessToDisplay);
  }
}
