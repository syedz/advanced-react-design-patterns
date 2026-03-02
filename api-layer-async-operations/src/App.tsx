import React from "react";
import Users from "./components/users";
import { SearchMeals } from "./components/search-meals";
import styled from "styled-components";

const SplitScreen = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const LeftSide = styled.div`
  flex: 1;
`;

const RightSide = styled.div`
  flex: 1;
`;

const App: React.FC = () => {
  return (
    <SplitScreen>
      <LeftSide>
        <Users />
      </LeftSide>
      <RightSide>
        <SearchMeals />
      </RightSide>
    </SplitScreen>
  );
};

export default App;