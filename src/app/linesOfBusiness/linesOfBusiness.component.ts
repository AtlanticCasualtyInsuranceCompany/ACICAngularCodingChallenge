import { Component, OnInit } from '@angular/core';
import { RecentQuotes } from '../RecentQuotes';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-linesOfBusiness',
  templateUrl: './linesOfBusiness.component.html',
  styleUrls: ['./linesOfBusiness.component.css']
})
export class LineOfBusinessComponent implements OnInit {
  [x: string]: any;
  linesOfBusiness: LineOfBusiness[] = [];
  // allRecentQuotes: RecentQuotes [] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService) {
    
   } 

  ngOnInit() {
    this.getLinesOfBusiness();
    // this.getAllRecentQuotes();
    console.log("lines linesOfBusiness",this.linesOfBusiness  )
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
    .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness);
   
    
  }
  // getAllRecentQuotes():void{
  //   this.lineOfBusinessService.getAllRecentQuotes()
  //     .subscribe(allRecentQuotes => this.allRecentQuotes = allRecentQuotes);
  // }
  add(name: string, description: string): void {
    name = name.trim();
    if (!name) { return; }
    this.lineOfBusinessService.addLineOfBusiness({ name, description } as LineOfBusiness)
      .subscribe(lineOfBusiness => {
        this.linesOfBusiness.push(lineOfBusiness);
      });
      
  }

  delete(lineOfBusiness: LineOfBusiness): void {
    this.linesOfBusiness = this.linesOfBusiness.filter(lob => lob !== lineOfBusiness);
    this.lineOfBusinessService.deleteLineOfBusiness(lineOfBusiness.id).subscribe();
  }

}
function subsribe(arg0: (recentQuotes: any) => any) {
  throw new Error('Function not implemented.');
}

function id(id: any) {
  throw new Error('Function not implemented.');
}

