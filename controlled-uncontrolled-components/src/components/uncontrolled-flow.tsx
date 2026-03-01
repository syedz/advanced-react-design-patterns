import React, { useState, isValidElement, cloneElement } from 'react';

interface UncontrolledFlowProps {
  children: React.ReactNode;
  onDone: (data: any) => void;
}

export const UncontrolledFlow: React.FC<UncontrolledFlowProps> = ({ children, onDone }) => {
  const [data, setData] = useState<any>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const currentChild = childrenArray[currentStepIndex];

  const goNext = (dataFromStep: any) => {
    const nextStepIndex = currentStepIndex + 1;
    const updatedData = { ...data, ...dataFromStep };

    console.log("Current Progress:", updatedData);

    if (nextStepIndex < childrenArray.length) {
      setCurrentStepIndex(nextStepIndex);
    } else {
      onDone(updatedData);
    }

    setData(updatedData);
  };

  if (isValidElement(currentChild)) {
    return cloneElement(currentChild as React.ReactElement<any>, { goNext });
  }

  return <>{currentChild}</>;
};