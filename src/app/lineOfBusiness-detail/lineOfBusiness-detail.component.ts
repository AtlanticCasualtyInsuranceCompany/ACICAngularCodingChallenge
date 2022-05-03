import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RecentQuotes } from '../RecentQuotes';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: [ './lineOfBusiness-detail.component.css' ]
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  recentQuotes:RecentQuotes | undefined;

  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
    this.getRecentQuotes();
  }

  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineOfBusiness => this.lineOfBusiness = lineOfBusiness);
  }
  getRecentQuotes(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getRecentQuotes(id)
    .subscribe(recentQuotes => this.recentQuotes = recentQuotes);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService.updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
