import type { MealsResponse } from "../types/meal";
import api from "./api";

const URLS = { getMeal: "search.php" };

export const searchMeals = (query: string, config: any) => {
  return api
    .get<MealsResponse>(URLS.getMeal, {
      baseURL: "https://www.themealdb.com/api/json/v1/1/",
      params: { s: query },
      ...config,
    });
};