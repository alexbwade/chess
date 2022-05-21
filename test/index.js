import { render as rtlRender } from "@testing-library/react";

import { GameContext } from "~context";
import { BOARD_NEW_GAME } from "~constants";

export const render = (component, { Context, providerProps, ...renderOptions }) => {
  if (!Context) return rtlRender(component);

  return rtlRender(<Context.Provider {...providerProps}>{component}</Context.Provider>, renderOptions);
};

const defaultGameContext = {
  moveStart: jest.fn(),
  moveEnd: jest.fn(),
  config: BOARD_NEW_GAME,
};

export const renderWithGameContext = (component, contextValue) => {
  return render(component, {
    Context: GameContext,
    providerProps: {
      value: {
        ...defaultGameContext,
        ...contextValue,
      },
    },
  });
};
