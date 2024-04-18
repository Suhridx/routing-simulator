import React, { useContext, useRef } from "react";
import { AppContext } from "../AppContext";

const Dropdown = ({setShowMenu}) => {

  const{appData,setAppData,connectionArray,setConnectionArray} = useContext(AppContext)
  const inputFileRef = useRef(null);


  function handleOpen() {
    inputFileRef.current.click();
    // setShowMenu(false)
  }

  function handleFileChange(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const jsonData = event.target.result;
      try {
        const parsedData = JSON.parse(jsonData);
        const { appData: newAppData, connectionArray: newConnectionArray } = parsedData;
  
        // Update the context values directly
        setAppData(newAppData);
        setConnectionArray(newConnectionArray);
  
        // Optionally, you can do something after updating the context
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    };
  
    reader.readAsText(file);
    setShowMenu(false)
  }
  
  

  function handleSave() {
  
    const dataToSave = {
      appData,
      connectionArray
    };
  
    const jsonData = JSON.stringify(dataToSave, null, 2);
  
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowMenu(false)
  }

  const mystyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "25px",
    margin: "5px 4px",
    padding: "0px 8px",
    borderRadius:"3px",
    cursor: "pointer",
  };
  
  return (
    <div
      style={{
        width: "180px",
        height: "120px",
        position: "absolute",
        top: "calc(13% - 6vh)",
        padding:"5px 0px",
        marginLeft:"15px",
        background: "rgba(220, 220, 220, 0.60)",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(7.3px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        zIndex: "10",
        textAlign:"left"
      }}
      className="slide-in-blurred-top"
    >
        <div style={mystyle}className="barlow-thin hover" onClick={handleOpen}>Open from<span className="material-symbols-outlined">open_in_browser</span></div>
        <div style={mystyle}className="barlow-thin hover" onClick={handleSave}>Save to<span className="material-symbols-outlined">download</span></div>
        <div style={mystyle}className="barlow-thin hover" onClick={()=>setShowMenu(false)}>Close<span className="material-symbols-outlined">cancel</span></div>
        <input style={{display:"none"}} type="file" ref={inputFileRef} onChange={handleFileChange}/>
    </div>
  );
};

export default Dropdown;
