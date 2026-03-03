import { createContext, type PropsWithChildren, type Dispatch, useReducer } from "react";
import {
  type ColorActions,
  colorReducer,
  initState,
} from "../reducer/color-reducer";

type ColorContextState = {
  hexColor: string;
  dispatch: Dispatch<ColorActions>;
};

// Create the context with a type assertion to avoid undefined errors
export const ColorContext = createContext<ColorContextState>({
  hexColor: "#FDGTA34",
} as ColorContextState);

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [{ hexColor }, dispatch] = useReducer(colorReducer, initState);
  return (
    <ColorContext.Provider value={{ hexColor, dispatch }}>
      {children}
    </ColorContext.Provider>
  );
};
