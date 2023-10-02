import { Component, OnInit } from '@angular/core';
import { LineOfBusiness } from '../models/line-of-business.model';
import { LineOfBusinessService } from '../services/line-of-business.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService) { }

  ngOnInit() {
    this.getLinesOfBusiness();
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness.slice(1, 4));
  }
}
