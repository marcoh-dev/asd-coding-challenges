import { Injectable } from "@nestjs/common";
import seed from "../../data/seed.json";
import type { QuoteFilters, QuoteResult } from "./quote.type";

@Injectable()
export class QuotesService {
  private quotes = seed;

  getQuotes(filterInput: QuoteFilters): QuoteResult {
    const filters: QuoteFilters = {};
    const author = filterInput.author ? filterInput.author.trim() : undefined;
    const quotes = author
      ? this.quotes.filter((quote) =>
          quote.author.toLowerCase().includes(author.toLowerCase()),
        )
      : this.quotes;

    if (author) {
      filters.author = author;
    }

    return {
      quotes,
      filters,
    };
  }

  getRandomQuote() {
    const randomQuote =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
    return randomQuote;
  }
}
