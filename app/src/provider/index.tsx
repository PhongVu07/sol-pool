import React, { createContext, useContext, useReducer } from "react";
import { IAction, IState } from "types/context";
import { WalletKitProvider } from "@gokiprotocol/walletkit";
import AppReducer from "./AppReducer";

const initialState: IState = {};

export const GlobalContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({ state: initialState, dispatch: () => undefined });

export const useStore = () => {
  const store = useContext(GlobalContext);
  return store;
};

export const Provider = ({ children }: { children: React.ReactChild }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <WalletKitProvider
      app={{
        name: "GoldPool",
      }}
    >
      <GlobalContext.Provider value={{ state, dispatch }}>
        {children}
      </GlobalContext.Provider>
    </WalletKitProvider>
  );
};
