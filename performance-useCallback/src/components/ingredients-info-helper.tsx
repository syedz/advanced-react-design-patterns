import React from "react";
import styled from "styled-components";

const IngredientsInfoHelper: React.FC = () => {
  console.log("IngredientsInfoHelper rendered");
  return <StyledButton>📙</StyledButton>;
};

// Memoized to prevent re-renders when parent state changes
export default IngredientsInfoHelper;

const StyledButton = styled.button`width: 2rem; height: 2rem; border: 0; background: white; font-size: 20px; cursor: pointer;`;