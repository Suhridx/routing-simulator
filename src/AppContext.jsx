// AppContext.js
import React, { createContext, useState } from "react";

// Create a context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // Define your object or state here
  const [appData, setAppData] = useState([]);
  const [connectionArray,setConnectionArray] = useState([])

  return (
    <AppContext.Provider value={{ appData, setAppData , connectionArray,setConnectionArray}}>
      {children}
    </AppContext.Provider>
  );
};

export const MessageContext = createContext();

// Create a provider component
export const MessageProvider = ({ children }) => {
  // Define your object or state here
  const [nodes, setNodes] = useState([]);
  const [pathArray,setPathArray]=useState([])

  return (
    <MessageContext.Provider value={{ nodes,setNodes,pathArray,setPathArray}}>
      {children}
    </MessageContext.Provider>
  );
};
