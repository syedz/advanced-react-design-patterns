import "./App.css";
import React from "react";
import SplitScreen from "./components/SplitScreen.tsx";

interface SideProps {
  title: string;
}

const LeftSideComponent: React.FC<SideProps> = ({ title }) => {
  return <h2 style={{ backgroundColor: "red" }}>{title}</h2>;
};

const RightSideComponent: React.FC<SideProps> = ({ title }) => {
  return <h2 style={{ backgroundColor: "blue" }}>{title}</h2>;
};

const App: React.FC = () => {
  return (
    <SplitScreen leftWidth={1} rightWidth={3}>
      <LeftSideComponent title="Left" />
      <RightSideComponent title="Right" />
    </SplitScreen>
  );
};

export default App;
