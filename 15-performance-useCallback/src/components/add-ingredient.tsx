import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  addIngredient: (name: string) => void;
}

const AddIngredient: React.FC<Props> = ({ addIngredient }) => {
  console.log("AddIngredient rendered");
  // Moved this from Ingredients and updated the props to no longer accept it
  const [ingredient, setIngredient] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredient) return;
    addIngredient(ingredient);
    setIngredient("");
  };

  return (
    <form onSubmit={handleAdd}>
      <StyledFieldset>
        <label>Add ingredient</label>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
      </StyledFieldset>
      <StyledButtonContainer>
        <StyledButton type="submit">Add</StyledButton>
      </StyledButtonContainer>
    </form>
  );
};

export default AddIngredient;

const StyledFieldset = styled.fieldset`display: flex; flex-direction: column; align-items: start; margin-bottom: 1.5rem; border: none; padding: 0;`;
const StyledButtonContainer = styled.div`display: flex; justify-content: flex-end;`;
const StyledButton = styled.button`background-color: #1f6feb; color: white; padding: 0.5rem 1rem; border: none; cursor: pointer;`;