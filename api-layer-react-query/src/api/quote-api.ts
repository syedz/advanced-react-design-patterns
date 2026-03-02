import api from "./api";
import type { Quote, QuoteResponse } from "../types/quotes";

export const fetchTopQuotes = () =>
  api.get<QuoteResponse>("top_quotes", {}).then((res) => res.data.quotes);

export const postQuote = (quote: Quote) => 
  api.post<Quote>("", quote, {});

export const resetQuotes = () => 
  api.post("reset", {}, {});