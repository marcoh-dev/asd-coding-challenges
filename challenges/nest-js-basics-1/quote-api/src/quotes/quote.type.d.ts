export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export type QuoteFilters = {
  author?: string;
};

export type QuoteResult = {
  quotes: Quote[];
  filters: QuoteFilters;
};
