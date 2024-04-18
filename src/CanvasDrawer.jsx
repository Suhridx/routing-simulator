import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import rough from "roughjs/bundled/rough.esm";
import { AppContext, MessageContext } from "./AppContext";

const generator = rough.generator();

const createElement = (x1, y1, x2, y2,color) => {
  const roughElement = generator.line(x1, y1, x2, y2, { strokeWidth: "1.2" ,stroke:color });
  return { x1, y1, x2, y2, roughElement };
};



const CanvasDrawer = ({ mouse ,iconId }) => {
  const { appData,connectionArray } = useContext(AppContext);
  const {pathArray} = useContext(MessageContext)
  const [elements, setElements] = useState([]);
  const [posArray, setPosArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const spanStyle = {
    position: 'absolute',
    color:"#debf64",
    zIndex:"2",
    left: posArray[currentIndex]?.x ,
    top: posArray[currentIndex]?.y,
    transition : "left 2s, top 2s"
  };

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
    setCurrentIndex(0);
  }, [pathArray, appData]);

    // Move to the next position at regular intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (prevIndex === posArray.length - 1) {
          clearInterval(intervalId); // Stop interval when reaching the end
        }
        return prevIndex < posArray.length - 1 ? prevIndex + 1 : prevIndex;
      });
    }, 2500); // Adjust interval duration as needed

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [posArray]);


  
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rc = rough.canvas(canvas);
    elements.forEach(({ roughElement }) => rc.draw(roughElement));
  }, [elements]);



  useEffect(() => {
    setElements([]);
    if (connectionArray.length < 1) {
      console.log("No connections");
      return;
    }
  
    connectionArray.forEach(pair => {
      const [firstId, secondId] = pair;
      const firstElement = appData.find(item => item.id == firstId);
      const secondElement = appData.find(item => item.id == secondId);
      let color="black"
      if(firstElement.type=="router" && secondElement.type=="router")
       color="red"
      if (firstElement && secondElement) {
        const newElement = createElement(
          firstElement.x + 15,
          firstElement.y + 15,
          secondElement.x + 15,
          secondElement.y + 15,
          color,
        );
        setElements(prev => [...prev, newElement]);
      }
    });
  }, [connectionArray, appData]);
  

  // const handleMouseDown = (e) => {
  //   if (mouse != 2) return;
  //   setDrawing(true);
  //   const { clientX, clientY } = e;
  //   const { left, top } = document
  //     .getElementById("canvas")
  //     .getBoundingClientRect();
  //   const offsetX = clientX - left + 6;
  //   const offsetY = clientY - top + 18;
  //   const element = createElement(offsetX, offsetY, offsetX, offsetY);
  //   setElements((prev) => [...prev, element]);
  // };

  useEffect(()=>{
    if(iconId==undefined)
     return
    const pos = appData.find(el => el.id === iconId);
    const line = createElement(
      pos.x+15,
      pos.y+15,
      pos.x+15,
      pos.y+15,
    );
    setElements((prev)=>[...prev,line]);
  },[iconId])

  const handleMouseMove = (e) => {
    if (iconId===undefined) {
      console.log("returned");
      return;
    }
    const { left, top } = document.getElementById("canvas").getBoundingClientRect();
    const { clientX, clientY } = e;
    const index = elements.length - 1;
    // const { x1, y1 } = elements[index];
    const pos = appData.find(el => el.id === iconId);
    // console.log(pos);
    const updatedElement = createElement(
      pos.x+15,
      pos.y+15,
      clientX - left + 6,
      clientY - top + 18
    );
    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setElements((prevElements) => {
        const newElements = [...prevElements];
        newElements.pop();
        return newElements;
    });
};

  return (
    <>
    {pathArray.length>1?
      <span className="material-symbols-outlined" style={spanStyle}>
        mail
      </span>:""
    }
    <canvas
      style={{ width: "100%",height:"86vh", zIndex:"2" }}
      id="canvas"
      // onMouseDown={handleMouseDown}
      onMouseMove={mouse==2 && iconId ?handleMouseMove:()=>{}}
      onContextMenu={mouse==2 && iconId?handleContextMenu:()=>{}}
      >
    </canvas>
      </>
  );
};

export default CanvasDrawer;
