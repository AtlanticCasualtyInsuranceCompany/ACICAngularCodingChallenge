import { Component, OnInit } from '@angular/core';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuote } from '../RecentQuote';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  recentQuotes: RecentQuote[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService) { }

  ngOnInit() {
    this.getLinesOfBusiness();
    this.getRecentQuotes();
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness.slice(0, 2));
  }

  getRecentQuotes(): void {
    this.lineOfBusinessService.getRecentQuotes()
    .subscribe(() => this.recentQuotes = this.recentQuotes.slice(0,2));
    
  }

}
