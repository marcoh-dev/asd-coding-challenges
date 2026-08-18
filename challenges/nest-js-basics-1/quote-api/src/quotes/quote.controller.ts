import { Controller, Get, Query, Render } from "@nestjs/common";
import { QuotesService } from "./quote.service";

@Controller()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get("/quotes")
  @Render("quotes")
  showQuotes(@Query("author") author?: string) {
    const { quotes, filters } = this.quotesService.getQuotes({ author });
    return {
      quotes,
      filters,
    };
  }

  @Get("/quotes/random")
  @Render("randomQuote")
  showRandomQuote() {
    return {
      quote: this.quotesService.getRandomQuote(),
    };
  }

  @Get("/api/quotes")
  getQuotes(@Query("author") author?: string) {
    const { quotes } = this.quotesService.getQuotes({ author });
    return quotes;
  }

  @Get("/api/quotes/random")
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }
}
