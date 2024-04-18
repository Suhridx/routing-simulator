import React, { useContext, useEffect, useState } from "react";
import logo from "./assets/neural-network.png";
import { AppContext, MessageContext } from "./AppContext";
import simulator from "./functions/router";
import Dropdown from "./utils/Dropdown";

export const Top = ({ setShow }) => {
  const [simulate, setSimulate] = useState(0);
  const { connectionArray, appData } = useContext(AppContext);
  const { nodes, pathArray, setPathArray } = useContext(MessageContext);
  const [posArray, setPosArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMenu,setShowMenu] = useState(false)

  useEffect(() => {
    const newPosArray = [];
    pathArray.forEach(pathId => {
      const appObject = appData.find(item => item.id === pathId);
      if (appObject) {
        const { x, y } = appObject;
        newPosArray.push({ x, y });
      }
    });
    setPosArray(newPosArray);

    // Reset currentIndex when posArray changes
    // setCurrentIndex(0);
  }, [pathArray, appData]);

  // Move to the next position at regular intervals
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentIndex(prevIndex => {
  //       if (prevIndex === posArray.length - 1) {
  //         clearInterval(intervalId); // Stop interval when reaching the end
  //       }
  //       return prevIndex < posArray.length - 1 ? prevIndex + 1 : prevIndex;
  //     });
  //   }, 1000); // Adjust interval duration as needed

  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, [posArray]);

  function handleClick() {
    if (nodes.length == 0) {
      alert("Select Nodes to send message");
      return;
    }
    setPathArray([]);
    setSimulate(1);
    setShow(true);
    simulator(connectionArray, nodes, setSimulate, setPathArray);
    setTimeout(() => {
      setSimulate(0)
    }, 1000);
  }

  const mystyle = {
    height: "6vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10px",
    paddingBottom: "5px",
    boxShadow: " 0px 5px 14px -13px rgba(0,0,0,0.44)",
  };

  // Calculate span position based on current index
  
  return (
    <div style={mystyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
          gap: "10px",
        }}
      >
        <span
          className={showMenu?"material-symbols-outlined menu-icon selected":"material-symbols-outlined menu-icon"}
          style={{ width: "30px", cursor: "pointer", userSelect:"none" }}
          onClick={()=>setShowMenu((prev)=>!prev)}
        >
          menu
        </span>
        <img
          src={logo}
          className="logo"
          alt="Vite logo"
          style={{ height: "2rem" }}
        />
        <text style={{ fontSize: "1rem" }}>Routing Simulator</text>
      </div>
      {simulate ? <div className="loader2"></div> : ""}
      <div style={{ paddingRight: "30px" }}>
        <button
          className="button-10"
          onClick={handleClick}
          disabled={simulate ? true : false}
        >
          {simulate == 2
            ? "Simulating..."
            : simulate
            ? "Tracing..."
            : "Send Packet"}
        </button>
      </div>

      {showMenu &&<Dropdown setShowMenu={setShowMenu}/>}
    </div>
  );
};
