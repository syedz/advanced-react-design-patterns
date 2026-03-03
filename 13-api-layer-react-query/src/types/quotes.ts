export interface Quote {
  id: string;
  quote: string;
  author: string;
}

export interface QuoteResponse {
  quotes: Quote[];
}