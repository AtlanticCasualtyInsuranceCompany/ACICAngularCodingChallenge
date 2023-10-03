import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesSummaryComponent } from './quotes-summary.component';
import { of } from 'rxjs';
import { LineOfBusinessService } from '../services/line-of-business.service';
import { QuoteService } from '../services/quote.service';

describe('QuotesSummaryComponent', () => {
  let component: QuotesSummaryComponent;
  let fixture: ComponentFixture<QuotesSummaryComponent>;
  let mockQuoteService: jasmine.SpyObj<QuoteService>;
  let mockLineOfBusinessService: jasmine.SpyObj<LineOfBusinessService>;

  beforeEach(async () => {
    mockQuoteService = jasmine.createSpyObj('QuoteService', ['getQuotes']);
    mockLineOfBusinessService = jasmine.createSpyObj('LineOfBusinessService', ['getLineOfBusinessNo404']);

    await TestBed.configureTestingModule({
      declarations: [ QuotesSummaryComponent ],
      providers: [
        { provide: QuoteService, useValue: mockQuoteService },
        { provide: LineOfBusinessService, useValue: mockLineOfBusinessService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesSummaryComponent);
    component = fixture.componentInstance;

    mockQuoteService.getQuotes.and.returnValue(of([
      { id: 101, quoteNumber: 'AC123PC', lineOfBusinessId: 11 },
      { id: 102, quoteNumber: 'AC124PC', lineOfBusinessId: 12 },
      { id: 103, quoteNumber: 'AC125PC', lineOfBusinessId: 13 },
      { id: 104, quoteNumber: 'AC126PC', lineOfBusinessId: 14 },
      { id: 105, quoteNumber: 'AC127PC', lineOfBusinessId: 15 },
      { id: 106, quoteNumber: 'AC125PC', lineOfBusinessId: 13 },
      { id: 107, quoteNumber: 'AC126PC', lineOfBusinessId: 13 },
      { id: 108, quoteNumber: 'AC127PC', lineOfBusinessId: 15 }
    ]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
