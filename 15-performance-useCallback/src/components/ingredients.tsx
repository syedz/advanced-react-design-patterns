import React, { useCallback, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import IngredientsList from "./ingredients-list";
import IngredientsInfoHelper from "./ingredients-info-helper";
import AddIngredient from "./add-ingredient";

const initialIngredients = [
  { id: nanoid(), name: "500g Chicken Breasts" },
  { id: nanoid(), name: "300 ml milk" },
  { id: nanoid(), name: "1 tbsp salt" },
];

interface Props {
  helper: React.ReactNode;
}

const Ingredients: React.FC<Props> = ({ helper }) => {
  console.log("Ingredients (Parent) rendered");
  const [ingredients, setIngredients] = useState(initialIngredients);

  const addIngredient = (name: string) => {
    setIngredients((prev) => [...prev, { name, id: nanoid() }]);
  };

  // useCallback preserves the reference of this function
  const deleteIngredient = useCallback((id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  }, []);

  // Memoizing the JSX element itself
  const ingredientsHeaderText = useMemo(() => {
    console.log("createIngredientsHeaderText (via useMemo) called");
    return (
      <StyledHeading2>
        Ingredients ({ingredients.length})
      </StyledHeading2>
    );
  }, [ingredients.length]);

  return (
    <StyledContainer>
      <div>
        {ingredientsHeaderText}
        {helper}
      </div>
      <StyledSpaceY4>
        <AddIngredient
          addIngredient={addIngredient}
        />
        <IngredientsList
          ingredients={ingredients}
          deleteIngredient={deleteIngredient}
        />
      </StyledSpaceY4>
    </StyledContainer>
  );
};

export default Ingredients;

const StyledContainer = styled.div`margin: 2rem auto; max-width: 20rem;`;
const StyledHeading2 = styled.h2`margin-bottom: 1rem; font-weight: 600;`;
const StyledSpaceY4 = styled.div`margin-top: 1rem;`;