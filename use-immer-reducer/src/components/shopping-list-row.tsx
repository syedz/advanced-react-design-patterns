import React, { useEffect, useState } from "react";
import styled from "styled-components";
import type { ShoppingItem } from "../types/shopping-list.ts";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInputContainer = styled.div``;

const StyledInput = styled.input`
  width: 100%;
`;

const StyledText = styled.div``;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const StyledButton = styled.button`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

interface UseEditShoppingItemProps {
  item: ShoppingItem;
  updateItem: (payload: { index: number; item: ShoppingItem }) => void;
  index: number;
}

const useEditShoppingItem = ({
  item,
  updateItem,
  index,
}: UseEditShoppingItemProps) => {
  const [name, setName] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setName(item.name);
  }, [item]);

  const onSaveItem = () => {
    updateItem({
      index,
      item: { ...item, name },
    });
    setIsEditing(false);
  };

  const onEditItem = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setName(item.name);
  };

  return {
    name,
    isEditing,
    cancelEdit,
    setName,
    onSaveItem,
    onEditItem,
  };
};

interface ShoppingListRowProps {
  item: ShoppingItem;
  index: number;
  deleteItem: (payload: { index: number }) => void;
  updateItem: (payload: { index: number; item: ShoppingItem }) => void;
}

const ShoppingListRow: React.FC<ShoppingListRowProps> = ({
  item,
  deleteItem,
  index,
  updateItem,
}) => {
  const { name, isEditing, cancelEdit, setName, onSaveItem, onEditItem } =
    useEditShoppingItem({ item, updateItem, index });

  return (
    <StyledContainer>
      <StyledInputContainer>
        {isEditing ? (
          <StyledInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <StyledText>{item.name}</StyledText>
        )}
      </StyledInputContainer>
      <StyledButtonContainer>
        {isEditing ? (
          <>
            <StyledButton onClick={onSaveItem}>Save</StyledButton>
            <StyledButton onClick={cancelEdit}>Cancel</StyledButton>
          </>
        ) : (
          <>
            <StyledButton onClick={onEditItem}>Edit</StyledButton>
            <StyledButton onClick={() => deleteItem({ index })}>
              Delete
            </StyledButton>
          </>
        )}
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export default ShoppingListRow;
