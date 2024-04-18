import React, { useEffect, useState } from "react";
import pc from "./assets/computer.png";
import router from "./assets/router.png";
import wire from "./assets/wire.png";
import text from "./assets/text.png";
import PlayWindow from "./PlayWindow";
import message from "./assets/message-1.png"
import dl_wire from "./assets/dl_wire.png"


const Middle = () => {
  const [selected, setSelected] = useState(0);
  

  useEffect(() => {
    document.addEventListener('keypress',(e)=>{
      if(e.key=='h')
      setSelected(1)
      if(e.key=='r')
      setSelected(6)
      if(e.key=='d')
      setSelected(5)
      if(e.key=='x')
      setSelected(4)
      if(e.key=='w')
      setSelected(2)
    })
    if(selected===1)
     document.body.style.cursor="move";
    else if (selected === 2) {
      document.body.style.cursor = `url(${wire}), auto`;
    } else if (selected === 3)
      document.body.style.cursor = `url(${text}), auto`;
    else if (selected === 5) document.body.style.cursor = `url(${pc}), auto`;
    else if (selected === 6) document.body.style.cursor = `url(${router}), auto`;
    else if (selected === 7) document.body.style.cursor = `url(${message}), auto`;
    else if (selected === 8) document.body.style.cursor = `url(${dl_wire}), auto`;
    else {
      document.body.style.cursor = "auto";
    }
  }, [selected]);

  return (
    <div
      style={{
        flexGrow: "1 ",
        display: "flex",
        margin: "10px 5px 5px 5px",
        boxShadow: "0px 2px 14px -8px rgba(0,0,0,0.44)",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          userSelect:"none",
          width: "40px",
          height: "max-content",
          margin: "10px",
          padding: "24px 0px",
          position: "relative",
          left: "50px",
          top: "20px",
          borderRadius: "5px",
          boxShadow: " 0px 1px 6px -1px rgba(0,0,0,0.44)",
          zIndex: "5",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            justifyContent: "center",
            cursor:"pointer"
          }}
        >
          <span
            className={
              selected == 0
                ? "material-symbols-outlined selected"
                : "material-symbols-outlined"
            }
            onClick={() => setSelected(0)}
          >
            arrow_selector_tool
          </span>
          <span
            className={
              selected == 1
                ? "material-symbols-outlined selected"
                : "material-symbols-outlined"
            }
            onClick={() => setSelected(1)}
          >
            drag_pan
          </span>
          <span
            className={
              selected == 2
                ? "material-symbols-outlined selected"
                : "material-symbols-outlined"
            }
            onClick={() => setSelected(2)}
          >
            draw
          </span>
          <span
            className={
              selected == 3
                ? "material-symbols-outlined selected"
                : "material-symbols-outlined"
            }
            onClick={() => setSelected(3)}
          >
            insert_text
          </span>
          <span
          style={selected==4?{color:"white",backgroundColor:"red"}:{}}
            className={
              selected == 4
                ? "material-symbols-outlined selected"
                : "material-symbols-outlined"
            }
            onClick={() => setSelected(4)}
          >
            delete_forever
          </span>
          <span
          style={selected==8?{color:"white",backgroundColor:"red"}:{}}
            className={
              selected == 8
                ? "material-symbols-outlined selected"
                : "material-symbols-outlined"
            }
            onClick={() => setSelected(8)}
          >
            remove_road
          </span>
          <span
          style={selected==5?{color:"white",backgroundColor:"#2288c7"}:{color:"#2288c7"}}
            className={
              selected == 5
                ? "material-symbols-outlined selected"
                : "material-symbols-outlined"
            }
            onClick={() => {
              setSelected(5);
            }}
          >
            devices
          </span>
          <span
          style={selected==6?{color:"white",backgroundColor:"#159e32"}:{color:"#159e32"}}
          
            className={
              selected == 6
                ? "material-symbols-outlined selected"
                : "material-symbols-outlined"
            }
            onClick={() => setSelected(6)}
          >
            router
          </span>
          <span 
          style={selected==7?{color:"white",backgroundColor:"#c2a532"}:{color:"#c2a532"}}
          className={ selected == 7 ? "material-symbols-outlined selected": "material-symbols-outlined"}
            onClick={() => setSelected(7)}>forward_to_inbox</span>
        </div>
      </div>
      <PlayWindow mouse={selected} setMouse={setSelected} />
    </div>
  );
};

export default Middle;
