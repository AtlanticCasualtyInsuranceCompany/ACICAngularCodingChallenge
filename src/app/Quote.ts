import { LineOfBusiness } from "./LineOfBusiness";

export interface Quote {
    id: number;
    quoteNumber: string;
    lineOfBusiness: number;
  }
  
  export interface LineOfBusinessQuoteSummary {
    lineOfBusiness: LineOfBusiness;
    numberOfQuotes: number;
  }
