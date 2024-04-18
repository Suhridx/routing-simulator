import React, { useContext } from "react";
import { AppContext, MessageContext } from "../AppContext";

const Result = ({ setShow }) => {
  const { pathArray } = useContext(MessageContext);
  const { appData } = useContext(AppContext);
  const matchedNames = [];

  const getNamesFromIDs = () => {
    if(pathArray.includes("0000"))
    {
      matchedNames.push({name:"NO PATH FOUND",type:""})
      return
    }
    // Iterate over pathArray
    pathArray.forEach((id) => {
      const matchedObject = appData.find((item) => item.id === id);
      if (matchedObject) {
        matchedNames.push({
          name: matchedObject.name,
          type: matchedObject.type,
        });
      }
    });
  };

  getNamesFromIDs();

  return (
    <div
      style={{
        width: "100vw",
        maxWidth: "1270px",
        height: "20vh",
        position: "absolute",
        bottom: "17px",
        margin: "10px 5px 5px 5px",
        // border:"1px solid black",
        boxShadow: " 0px 0px 9px -1px rgba(0,0,0,0.44)",
        borderRadius: "10px",
        // backgroundColor: "red",
        animation: "myAnim 1s ease 0s 1 normal none",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "14px",
          backgroundColor: "#48524a",
          alignItems: "center",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            color: "white",
            height: "4px",
            position: "relative",
            left: "50%",
          }}
        >
          horizontal_rule
        </span>
        <span
          className="material-symbols-outlined"
          style={{
            color: "white",
            fontSize: "10px",
            marginLeft: "auto",
            paddingRight: "10px",
          }}
          onClick={() => setShow(false)}
        >
          cancel
        </span>
      </div>
      <div style={{ padding: "20px", textAlign: "left" }}>
        <p className="cutive-mono-regular">TRACING...</p>
        {pathArray.length > 0 && (
          <p className="cutive-mono-regular">PATH TRACED.</p>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          {pathArray.length > 0 && (
            <p
              className="barlow-thin "
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "2px 4px",
              }}
            >
              ROUTE &#8605;
            </p>
          )}
          {matchedNames.map((item, index) => (
            <>
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "coloumn",
                  alignItems: "center",
                }}
              >
                <span
                  id={item.id}
                  className="material-symbols-outlined"
                  style={{
                    userSelect: "none",
                    fontSize: "20px",
                    color: item.type === "computer" ? "#2288c7" : "#159e32",
                  }}
                >
                  {item.type}
                </span>
                <p className="barlow-thin">{item.name}</p>
              </div>
              {index < matchedNames.length - 1 && <span>&nbsp;--&gt;</span>}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
