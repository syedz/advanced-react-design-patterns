import React, { isValidElement, cloneElement, useEffect, useRef } from "react";

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

  useEffect(() => {
    if (currentIndex >= childrenArray.length) {
        onDone();
    }
  }, [currentIndex, childrenArray.length, onDone]);

  if (isValidElement(currentChild)) {
    return cloneElement(currentChild as React.ReactElement<any>, {
      // Injects the parent's navigation handler into the child
      next: onNext,
    });
  }

  return <>{currentChild}</>;
};