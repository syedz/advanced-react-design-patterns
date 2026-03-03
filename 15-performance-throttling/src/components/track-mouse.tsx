import React from "react";
import { useMousePosition } from "../hooks/useMousePosition";
import styled from "styled-components";

const TrackMouse: React.FC = () => {
  // Use the custom hook with a 200ms throttle
  const position = useMousePosition({ throttleTime: 200 });

  return (
    <DisplayContainer>
      <Title>Mouse Tracker (Throttled)</Title>
      <PositionText>
        X: <Value>{position.x}</Value>, Y: <Value>{position.y}</Value>
      </PositionText>
    </DisplayContainer>
  );
};

export default TrackMouse;

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
`;

const Title = styled.h2`
  color: #333;
`;

const PositionText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Value = styled.span`
  color: #1f6feb;
`;