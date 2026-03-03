import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { searchMeals } from "../api/meal-api";
import { debounce } from "../helpers/debounce";

interface Meal {
  idMeal: string;
  strMeal: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);

  // We use useMemo to ensure the debounced function instance is persistent.
  // This prevents creating a new debounced timer on every re-render.
  const debouncedSearch = useMemo(() => {
    return debounce(async (searchQuery: string) => {
      const results = await searchMeals(searchQuery, {
        params: {
          s: searchQuery,
        },
      });
      setMeals(results.data.meals || []);
    }, 500);
  }, []);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Trigger the debounced request
    debouncedSearch(value);
  };

  return (
    <Container>
      <SearchForm>
        <Label>Search meals</Label>
        <Input 
          type="text" 
          value={query} 
          onChange={onChangeQuery} 
          placeholder="Type to search (e.g. chicken)"
        />
      </SearchForm>
      <ResultsList>
        {meals.map((meal) => (
          <MealItem key={meal.idMeal}>{meal.strMeal}</MealItem>
        ))}
      </ResultsList>
    </Container>
  );
};

export default Search;

// Styled Components
const Container = styled.div`padding: 2rem; max-width: 600px; margin: auto;`;
const SearchForm = styled.form`display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem;`;
const Label = styled.label`font-weight: bold;`;
const Input = styled.input`padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;`;
const ResultsList = styled.ul`list-style: none; padding: 0;`;
const MealItem = styled.li`padding: 0.5rem; border-bottom: 1px solid #eee;`;