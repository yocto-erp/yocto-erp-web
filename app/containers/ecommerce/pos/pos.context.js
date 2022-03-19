import React, { useContext } from "react";

export const PosListOrderContext = React.createContext([]);
export const PosOrderContext = React.createContext({});
export const PosDispatchContext = React.createContext(() => {});
export const usePosListOrderContext = () => useContext(PosListOrderContext);
export const usePosOrderContext = () => useContext(PosOrderContext);
export const usePosDispatch = () => useContext(PosDispatchContext);
