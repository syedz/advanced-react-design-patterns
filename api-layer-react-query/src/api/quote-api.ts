import api from "./api";
import type { QuoteResponse } from "../types/quotes";

export const fetchTopQuotes = () =>
  api.get<QuoteResponse>("top_quotes", {}).then((res) => res.data.quotes);