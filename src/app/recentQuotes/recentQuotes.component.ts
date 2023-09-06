import { Component, OnInit } from '@angular/core';

import { RecentQuote } from '../RecentQuote';
import { RECENT_QUOTES } from '../mock-recentQuotes';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-recentQuotes',
  templateUrl: './recentQuotes.component.html',
  styleUrls: ['./recentQuotes.component.css']
})
export class RecentQuotesComponent implements OnInit {
  recentQuote: RecentQuote[] = RECENT_QUOTES.slice(0,2);

  result = RECENT_QUOTES.filter(item => item.lineOfBusiness);

  constructor(private lineOfBusinessService: LineOfBusinessService) { } 

  ngOnInit() {
    this.getRecentQuotes();
    // this.getPopularLinesOfBusiness();
  }

  getRecentQuotes(): void {
    this.lineOfBusinessService.getRecentQuotes()
    .subscribe(recentQuote => recentQuote = this.recentQuote);
  }

  getPopularLinesOfBusiness(): void {
    this.lineOfBusinessService.getPopularLinesOfBusiness()
  }
  
  
}
