import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LineOfBusinessAnalysisService } from './line-of-business-analysis.service';
import { MessageService } from './message.service';
import { LineOfBusinessService } from './line-of-business.service';
import { QuoteService } from './quote.service';
import { of } from 'rxjs';

describe('LineOfBusinessAnalysisService', () => {
  let service: LineOfBusinessAnalysisService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let lineOfBusinessServiceSpy: jasmine.SpyObj<LineOfBusinessService>;
  let quoteServiceSpy: jasmine.SpyObj<QuoteService>;

  beforeEach(() => {
    const spyMessageService = jasmine.createSpyObj('MessageService', ['add']);
    const spyLineOfBusinessService = jasmine.createSpyObj('LineOfBusinessService', ['getLinesOfBusiness']);
    const spyQuoteService = jasmine.createSpyObj('QuoteService', ['getQuotes']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LineOfBusinessAnalysisService,
        { provide: MessageService, useValue: spyMessageService },
        { provide: LineOfBusinessService, useValue: spyLineOfBusinessService },
        { provide: QuoteService, useValue: spyQuoteService }
      ]
    });

    service = TestBed.inject(LineOfBusinessAnalysisService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    lineOfBusinessServiceSpy = TestBed.inject(LineOfBusinessService) as jasmine.SpyObj<LineOfBusinessService>;
    quoteServiceSpy = TestBed.inject(QuoteService) as jasmine.SpyObj<QuoteService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch top K lines of business by quote frequency', () => {
    const dummyQuotes = [
      { id: 101, quoteNumber: 'AC123PC', lineOfBusinessId: 11 },
      { id: 102, quoteNumber: 'AC124PC', lineOfBusinessId: 12 },
      { id: 103, quoteNumber: 'AC125PC', lineOfBusinessId: 13 },
      { id: 104, quoteNumber: 'AC126PC', lineOfBusinessId: 14 },
      { id: 105, quoteNumber: 'AC127PC', lineOfBusinessId: 15 },
      { id: 106, quoteNumber: 'AC125PC', lineOfBusinessId: 13 },
      { id: 107, quoteNumber: 'AC126PC', lineOfBusinessId: 13 },
      { id: 108, quoteNumber: 'AC127PC', lineOfBusinessId: 15 }
    ];

    const dummyLinesOfBusiness = [
      { id: 11, name: 'General Liability', description: 'Liability coverage for businesses.' },
      { id: 12, name: 'Commercial Property', description: 'Property coverage for businesses.' },
      { id: 13, name: 'Inland Marine', description: 'Coverage for tools and machinery on job sites.' },
      { id: 14, name: 'Ocean Marine', description: 'Coverage for dock and boat repair businesses.' },
      { id: 15, name: 'Garage', description: 'Coverage for auto repairs and car sales.' }
    ];

    quoteServiceSpy.getQuotes.and.returnValue(of(dummyQuotes));
    lineOfBusinessServiceSpy.getLinesOfBusiness.and.returnValue(of(dummyLinesOfBusiness));

    service.getTopKLinesOfBusinessByQuoteFrequency(2).subscribe(response => {
      expect(response).toBeDefined();
      expect(response.length).toEqual(2);
      expect(response[0]).toEqual({ id: 13, name: 'Inland Marine', quantity: 3 });
      expect(response[1]).toEqual({ id: 15, name: 'Garage', quantity: 2 });
    });
  });
});
