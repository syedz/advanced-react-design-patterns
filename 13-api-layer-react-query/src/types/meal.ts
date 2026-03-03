export interface Meal {
  idMeal: string;
  strMeal: string;
}

export interface MealsResponse {
  meals: Meal[];
}