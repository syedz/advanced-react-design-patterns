import React, { memo } from "react";
import styled from "styled-components";

interface Ingredient {
  id: string;
  name: string;
}

interface Props {
  ingredients: Ingredient[];
  deleteIngredient: (id: string) => void;
}

const IngredientsList: React.FC<Props> = ({ ingredients, deleteIngredient }) => {
  console.log("IngredientsList rendered");
  return (
    <StyledContainer>
      <StyledList>
        {ingredients.map((ingredient) => (
          <StyledListItem key={ingredient.id}>
            <span>{ingredient.name}</span>
            <StyledButton onClick={() => deleteIngredient(ingredient.id)}>
              X
            </StyledButton>
          </StyledListItem>
        ))}
      </StyledList>
    </StyledContainer>
  );
};

// Wrap with memo to prevent re-renders if props are identical
export default memo(IngredientsList);
// export default memo(IngredientsList, (prevProps, nextProps) => {
//   return prevProps.ingredients === nextProps.ingredients;
// });

const StyledContainer = styled.div`text-align: left;`;
const StyledList = styled.ul`border-top: 1px solid #d1d5db; list-style: none; padding: 0;`;
const StyledListItem = styled.li`padding: 0.75rem 0; display: flex; justify-content: space-between; border-bottom: 1px solid #eee;`;
const StyledButton = styled.button`cursor: pointer; background: none; border: none; color: red; font-weight: bold;`;