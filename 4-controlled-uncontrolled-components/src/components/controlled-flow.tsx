import React, { isValidElement, cloneElement } from "react";

interface ControlledFlowProps {
  children: React.ReactNode;
  currentIndex: number;
  onNext: (dataFromStep: any) => void;
  onDone: () => void;
}

export const ControlledFlow: React.FC<ControlledFlowProps> = ({
  children,
  currentIndex,
  onNext,
  onDone,
}) => {
  const childrenArray = React.Children.toArray(children);
  const currentChild = childrenArray[currentIndex];

  if (isValidElement(currentChild)) {
    return cloneElement(currentChild as React.ReactElement<any>, {
      // Injects the parent's navigation handler into the child
      next: onNext,
    });
  }
  
  if (currentIndex >= childrenArray.length) {
    onDone();
  }

  return <>{currentChild}</>;
};