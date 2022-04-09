import React, { useContext } from "react";

export const PosListOrderContext = React.createContext([]);
export const PosOrderContext = React.createContext({});
// eslint-disable-next-line no-unused-vars
export const PosDispatchContext = React.createContext(onSelectCustomer => {});
export const usePosListOrderContext = () => useContext(PosListOrderContext);
export const usePosOrderContext = () => useContext(PosOrderContext);
export const usePosDispatch = () => useContext(PosDispatchContext);
