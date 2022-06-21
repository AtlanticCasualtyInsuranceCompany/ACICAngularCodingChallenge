import { Component, OnInit } from '@angular/core';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { CombinedQuotes } from '../CombinedQuotes';


@Component({
  selector: 'app-top-lines-of-business',
  templateUrl: './top-lines-of-business.component.html',
  styleUrls: ['./top-lines-of-business.component.css']
})
export class TopLinesOfBusinessComponent implements OnInit {

  //checking final result quotes with interface CombinedQuotes
  quotes: CombinedQuotes[] = [];

  constructor(
    private lineOfBusinessService: LineOfBusinessService) {
  }

  ngOnInit() {
    this.getRecentQuotes();
  }

  getRecentQuotes(): void {
    this.lineOfBusinessService.getRecentQuotes()
      .subscribe(linesOfBusiness => {
        //sort array to show top two popular
        let sortArr = linesOfBusiness.sort(function(a, b){
        return b.count - a.count;
      });
        this.quotes = sortArr;
    });
  }
}

