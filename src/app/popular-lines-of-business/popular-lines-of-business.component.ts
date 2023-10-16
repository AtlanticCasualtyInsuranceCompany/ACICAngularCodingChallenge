import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessQuoteSummary, Quote } from '../Quote';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { QuoteService } from '../Quote.service';

@Component({
  selector: 'app-popular-lines-of-business',
  templateUrl: './popular-lines-of-business.component.html',
  styleUrls: ['./popular-lines-of-business.component.css']
})
export class PopularLinesOfBusinessComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  recentQuotes: Quote[] = [];
  lineOfBusinessQuoteSummaries: LineOfBusinessQuoteSummary[] = [];

  constructor(
    private lineOfBusinessService: LineOfBusinessService,
    private quoteService: QuoteService,
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.lineOfBusinessService.getLinesOfBusiness(),
      this.quoteService.getRecentQuotes()
    ]).subscribe(([linesOfBusinessData, recentQuotesData]) => {
      this.linesOfBusiness = linesOfBusinessData;
      this.recentQuotes = recentQuotesData;
      this.getTop2LinesOfBusiness();
    });
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness);
  }

  getRecentQuotes(): void {
    this.quoteService.getRecentQuotes()
      .subscribe(recentQuotes => this.recentQuotes = recentQuotes);
  }


  getTop2LinesOfBusiness(): LineOfBusinessQuoteSummary[] {
    let popularLinesOfBusinessMap = new Map<LineOfBusiness, number>()

    this.recentQuotes.reduce((acc, val) => {
      const business = this.linesOfBusiness.find((lob) => lob.id === val.lineOfBusiness);
      if (business) {
        let businessQuoteCount = popularLinesOfBusinessMap.get(business);
        if (businessQuoteCount) {
          popularLinesOfBusinessMap.set(business, businessQuoteCount += 1);
        } else {
          popularLinesOfBusinessMap.set(business, 1);
        }
      }
      return acc;
    }, popularLinesOfBusinessMap);

    const sortedLinesOfBusiness = [...popularLinesOfBusinessMap].sort((a, b) => b[1] - a[1])
    const top2LinesOfBusiness = sortedLinesOfBusiness.slice(0, 2);
    const top2lineOfBusinessQuoteSummaries = top2LinesOfBusiness.map((lob) => ({ lineOfBusiness: lob[0], numberOfQuotes: lob[1] }));

    return this.lineOfBusinessQuoteSummaries = top2lineOfBusinessQuoteSummaries;
  }
}
