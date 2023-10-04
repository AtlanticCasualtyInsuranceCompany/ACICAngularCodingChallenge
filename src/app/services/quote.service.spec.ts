import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuoteService } from './quote.service';
import { Quote } from '../models/quote';

describe('QuoteService', () => {
  let service: QuoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuoteService]
    });

    service = TestBed.inject(QuoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve quotes from the API through a GET request', () => {
    const dummyQuotes: Quote[] = [
        { id: 101, quoteNumber: 'AC123PC', lineOfBusinessId: 11 },
        { id: 102, quoteNumber: 'AC124PC', lineOfBusinessId: 12 },
        { id: 103, quoteNumber: 'AC125PC', lineOfBusinessId: 13 },
        { id: 104, quoteNumber: 'AC126PC', lineOfBusinessId: 14 },
        { id: 105, quoteNumber: 'AC127PC', lineOfBusinessId: 15 },
        { id: 106, quoteNumber: 'AC125PC', lineOfBusinessId: 13 },
        { id: 107, quoteNumber: 'AC126PC', lineOfBusinessId: 13 },
        { id: 108, quoteNumber: 'AC127PC', lineOfBusinessId: 15 }
    ];

    service.getQuotes().subscribe(quotes => {
      expect(quotes.length).toBe(8);
      expect(quotes).toEqual(dummyQuotes);
    });

    const request = httpMock.expectOne(service['quoteUrl']);
    expect(request.request.method).toBe('GET');
    request.flush(dummyQuotes);
  });

  it('should retrieve quotes for a given lineOfBusinessId', () => {
    const dummyQuotes: Quote[] = [
      { id: 101, quoteNumber: 'AC123PC', lineOfBusinessId: 11 },
      { id: 102, quoteNumber: 'AC124PC', lineOfBusinessId: 12 },
      { id: 103, quoteNumber: 'AC125PC', lineOfBusinessId: 13 },
      { id: 104, quoteNumber: 'AC126PC', lineOfBusinessId: 13 },
      { id: 105, quoteNumber: 'AC127PC', lineOfBusinessId: 15 },
      { id: 106, quoteNumber: 'AC125PC', lineOfBusinessId: 13 },
      { id: 107, quoteNumber: 'AC126PC', lineOfBusinessId: 13 },
      { id: 108, quoteNumber: 'AC127PC', lineOfBusinessId: 15 }
    ];

    const filteredQuotes = dummyQuotes.filter(quote => quote.lineOfBusinessId === 13);

    service.getQuotesByLineOfBusinessId(13).subscribe(quotes => {
      expect(quotes.length).toBe(4);
      expect(quotes).toEqual(filteredQuotes);
    });

    const request = httpMock.expectOne(service['quoteUrl']);
    expect(request.request.method).toBe('GET');
    request.flush(dummyQuotes);
  });
});
