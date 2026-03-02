import React from "react";
import { useImmerReducer } from "use-immer";
import styled from "styled-components";
import type { ShoppingItem } from "../types/shopping-list.ts";
import ShoppingListHeader from "./shopping-list-header.tsx";
import ShoppingListRow from "./shopping-list-row.tsx";

const StyledContainer = styled.div`
  padding-top: 2rem;
  width: 400px;
  margin: 0 auto;
  text-align: left;
`;

const StyledWrapper = styled.div`
  max-width: xs;
`;

const StyledAddItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
  max-width: xs;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
`;

const StyledButton = styled.button`
  align-self: flex-end;
  padding: 0.5rem 1rem;
  background-color: #86c784;
  color: #1a472a;
`;

const getUuid = (): string =>
  "_" + Math.random().toString(36).substring(2, 11);

interface ShoppingListState {
  newShoppingItemName: string;
  items: ShoppingItem[];
}

const initialShoppingItems: ShoppingListState = {
  newShoppingItemName: "",
  items: [
    { id: "1", name: "Sea Salt" },
    { id: "2", name: "Apples" },
    { id: "3", name: "Chicken breasts" },
  ],
};

type UpdateNewNameAction = {
  type: "UPDATE_NEW_SHOPPING_ITEM_NAME";
  payload: string;
};
type AddItemAction = { type: "ADD_ITEM"; payload: ShoppingItem };
type UpdateItemAction = {
  type: "UPDATE_ITEM";
  payload: { index: number; item: ShoppingItem };
};
type DeleteItemAction = {
  type: "DELETE_ITEM";
  payload: { index: number };
};

type ShoppingListAction =
  | UpdateNewNameAction
  | AddItemAction
  | UpdateItemAction
  | DeleteItemAction;

function reducer(
  draft: ShoppingListState,
  action: ShoppingListAction
): void {
  switch (action.type) {
    case "UPDATE_NEW_SHOPPING_ITEM_NAME":
      draft.newShoppingItemName = action.payload;
      break;
    case "ADD_ITEM":
      draft.newShoppingItemName = "";
      draft.items.push(action.payload);
      break;
    case "UPDATE_ITEM":
      draft.items.splice(action.payload.index, 1, action.payload.item);
      break;
    case "DELETE_ITEM":
      draft.items.splice(action.payload.index, 1);
      break;
  }
}

const ShoppingList: React.FC = () => {
  const [shoppingList, dispatch] = useImmerReducer(
    reducer,
    initialShoppingItems
  );

  const addItem = () => {
    if (!shoppingList.newShoppingItemName) return;
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: getUuid(),
        name: shoppingList.newShoppingItemName,
      },
    });
  };

  const deleteItem = (payload: { index: number }) => {
    dispatch({ type: "DELETE_ITEM", payload });
  };

  const updateItem = (payload: { index: number; item: ShoppingItem }) => {
    dispatch({ type: "UPDATE_ITEM", payload });
  };

  const onChangeShoppingListItemName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "UPDATE_NEW_SHOPPING_ITEM_NAME",
      payload: e.target.value,
    });
  };

  return (
    <StyledContainer>
      <StyledWrapper>
        <ShoppingListHeader shoppingList={shoppingList.items} />
        <div style={{ marginBottom: "1.5rem" }}>
          {shoppingList.items.map((item, index) => (
            <ShoppingListRow
              key={item.id}
              item={item}
              index={index}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          ))}
        </div>
        <StyledAddItemContainer>
          <StyledLabel htmlFor="shoppingItemField">Add item</StyledLabel>
          <StyledInput
            type="text"
            id="shoppingItemField"
            value={shoppingList.newShoppingItemName}
            onChange={onChangeShoppingListItemName}
          />
          <StyledButton type="button" onClick={addItem}>
            Add
          </StyledButton>
        </StyledAddItemContainer>
      </StyledWrapper>
    </StyledContainer>
  );
};

export default ShoppingList;
export { ShoppingList };
