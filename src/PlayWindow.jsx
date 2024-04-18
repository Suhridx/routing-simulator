import React, { useContext, useState ,useEffect} from "react";
import { AppContext, MessageContext } from "./AppContext";
import {
  remove,
  handleDragEnd,
  handleDragOver,
  handleDragStart,
  connect,
  clearConnection,
  removeConnection,
  message,
} from "./functions/functions";
import { generatePCId, generateRouterId } from "./functions/idGenerator.js";
import CanvasDrawer from "./CanvasDrawer.jsx";
import message_in from "./assets/message-2.png";


const PlayWindow = ({ mouse, setMouse }) => {
  const { appData, setAppData, connectionArray, setConnectionArray } =useContext(AppContext);
  const { nodes, setNodes,pathArray } = useContext(MessageContext);
  const [iconId, setIconId] = useState();
  


  

  function handleClick(e) {
    const containerRect = document
      .getElementById("container")
      .getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left;
    const offsetY = e.clientY - containerRect.top;

    if (mouse === 5) {
      const computerCount = appData.filter(
        (item) => item.type === "computer"
      ).length;
      setAppData([
        ...appData,
        {
          id: generatePCId(),
          name: `PC-${computerCount + 1}`,
          x: offsetX,
          y: offsetY,
          type: "computer",
        },
      ]);
    }

    if (mouse === 6) {
      const routerCount = appData.filter(
        (item) => item.type === "router"
      ).length;
      setAppData([
        ...appData,
        {
          id: generateRouterId(),
          name: `ROUTER-${routerCount + 1}`,
          x: offsetX,
          y: offsetY,
          type: "router",
        },
      ]);
    }
  }

  function iconClick(e) {
    if (mouse === 4) {
      remove(e, appData, setAppData, setConnectionArray);
    }
    if (mouse === 2) {
      let id = connect(e, setMouse, connectionArray, setConnectionArray);
      console.log(id);
      setIconId(id);
    }
    if (mouse === 7) {
      message(e, message_in, setMouse, setNodes);
    }

    if(mouse === 8){
      removeConnection(e,setMouse,setConnectionArray)
    }
  }

  // Prevent default behavior on dragover event

  return (
    <div
      id="container"
      style={{ position: "relative", width: "100%" }}
      onDragOver={handleDragOver}
    >
      <div
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault();
          clearConnection(mouse);
          setMouse(0);
          setIconId();
        }}
      >
        <CanvasDrawer mouse={mouse} iconId={iconId} />
      </div>
          {nodes.map((node) => {
            const appObject = appData.find((item) => item.id === node);
            if (appObject) {
              const { x, y } = appObject;
              return (
                <span
                className="material-symbols-outlined"
                  key={node.id}
                  style={{ position: "absolute", left: x+20, top: y-10,zIndex:"10" }}
                >
                  sms
                </span>
              );
            }
            return null;
          })}
          
      {appData.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${item.type === "computer" ? item.x : item.x - 20}px`,
            top: `${item.type === "computer" ? item.y : item.y - 6}px`,
          }}
        >
          <span
            draggable={mouse == 1 ? true : false}
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragEnd={(e) => handleDragEnd(e, appData, setAppData)}
            id={item.id}
            onClick={iconClick}
            className={`material-symbols-outlined ${
              mouse === 4
                ? "delete-cursor"
                : mouse === 2
                ? "pen-cursor"
                : mouse === 7
                ? "message-cursor"
                : ""
            }`}
            style={{
              userSelect: "none",
              fontSize: "30px",
              color: item.type === "computer" ? "#2288c7" : "#159e32",
            }}
          >
            {item.type}
          </span>
          <p style={{ position: "relative", top: "-10px" }}>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayWindow;
