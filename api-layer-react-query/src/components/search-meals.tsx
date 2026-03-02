import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { didAbort } from "../api/api";
import { searchMeals } from "../api/meal-api";
import type { Meal } from "../types/meal";

const useFetchMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const abortRef = useRef<{ abort?: () => void }>({});

  const handleFetchError = (error: any) => {
    if (didAbort(error)) {
      toast.error("Request aborted!");
    } else {
      toast.error("An error occurred!");
    }
  };

  const fetchMeals = async (query: string) => {
    if (!query) return setMeals([]);
    try {
      // Abort previous request
      abortRef.current.abort?.();

      const newMeals = await searchMeals(query, {
        abort: (cancelFn: () => void) => (abortRef.current.abort = cancelFn),
      });

      setMeals(newMeals?.data?.meals || []);
    } catch (error) {
      handleFetchError(error);
    }
  };

  return { meals, fetchMeals };
};

export const SearchMeals: React.FC = () => {
  const [query, setQuery] = useState("");
  const { meals, fetchMeals } = useFetchMeals();

  useEffect(() => {
    fetchMeals(query);
  }, [query]);

  return (
    <Container>
      <ToastContainer />
      <Form>
        <label htmlFor="meal">Find your lovely meal</label>
        <input
          id="meal"
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form>
      <MealList>
        {meals.map((meal) => (
          <div key={meal.idMeal}>{meal.strMeal}</div>
        ))}
      </MealList>
    </Container>
  );
};

// Styles
const Container = styled.div`padding: 2rem; max-width: 600px; margin: auto;`;
const Form = styled.div`display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;`;
const MealList = styled.div`max-height: 400px; overflow-y: auto; border: 1px solid #ddd; padding: 10px;`;