import React from "react";
import styled from "styled-components";
import type { ShoppingItem } from "../types/shopping-list.ts";

const StyledContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

const StyledHeading = styled.h2`
  font-weight: bold;
`;

interface ShoppingListHeaderProps {
  shoppingList: ShoppingItem[];
}

const ShoppingListHeader: React.FC<ShoppingListHeaderProps> = ({
  shoppingList,
}) => {
  return (
    <StyledContainer>
      <StyledHeading>Shopping List</StyledHeading>
      <span>{shoppingList.length} items 🛒</span>
    </StyledContainer>
  );
};

export default ShoppingListHeader;
