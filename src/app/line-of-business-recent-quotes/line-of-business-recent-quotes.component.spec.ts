import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineOfBusinessRecentQuotesComponent } from './line-of-business-recent-quotes.component';

describe('LineOfBusinessRecentQuotesComponent', () => {
  let component: LineOfBusinessRecentQuotesComponent;
  let fixture: ComponentFixture<LineOfBusinessRecentQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineOfBusinessRecentQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineOfBusinessRecentQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
