import { Component, OnInit } from '@angular/core';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuotes } from '../RecentQuotes';


@Component({
  selector: 'app-line-of-business-recent-quotes',
  templateUrl: './line-of-business-recent-quotes.component.html',
  styleUrls: ['./line-of-business-recent-quotes.component.css']
})
export class LineOfBusinessRecentQuotesComponent implements OnInit {
  // RecentQuotes
  allRecentQuotes: RecentQuotes [] = [];
  constructor(public lineOfBusinessService: LineOfBusinessService ) { 
  }

  ngOnInit(): void {
    this.getAllRecentQuotes();
  }

  getAllRecentQuotes(){
    this.lineOfBusinessService.getAllRecentQuotes()
      .subscribe(allRecentQuotes => this.allRecentQuotes = allRecentQuotes);

      console.log("getAllRecentQuotes()", this.allRecentQuotes)
  }

}
