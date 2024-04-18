export function remove(e, appData, setAppData, setConnectionArray) {
  const idToDelete = e.target.id;
  const indexToDelete = appData.findIndex((item) => item.id == idToDelete);
  if (indexToDelete !== -1) {
    const updatedAppData = [...appData];
    updatedAppData.splice(indexToDelete, 1);
    setAppData(updatedAppData);
    setConnectionArray((prev) => {
      const filteredArray = prev.filter((pair) => {
        return pair[0] !== idToDelete && pair[1] !== idToDelete;
      });
      return filteredArray;
    });
  }
  console.log(appData);
}

let firstId = null; // Variable to store the first clicked ID

export function connect(e, setMouse, connectionArray, setConnectionArray) {
  const secondId = e.target.id;
  if (!firstId) {
    firstId = secondId;
    if (
      firstId.startsWith("P") &&
      connectionArray.some((arr) => arr.includes(firstId))
    ) {
      alert("One Computer Cannot Have Multiple Connections");
      firstId = null;
      return;
    }
    console.log("Select another node to connect with...");
    return firstId;
  } else if (firstId != secondId) {
    if (secondId.startsWith("P")) {
      if (firstId.startsWith("P")) {
        alert("Must be a router");
        return firstId;
      }
      if (
        firstId.startsWith("R") &&
        connectionArray.some((arr) => arr.includes(secondId))
      ) {
        alert("One Computer Cannot Have Multiple Connections");
        return firstId;
      }
    }
    const connectedIds = [firstId, secondId];
    setConnectionArray((prev) => [...prev, connectedIds]);
    console.log(connectedIds);
    firstId = null;
    setMouse(0);
    return firstId;
  } else {
    alert("Two nodes cannot be same");
    firstId = null;
    setMouse(0);
    return firstId;
  }
}

export function clearConnection(mouse) {
  if(mouse==2)
  firstId = null;
if(mouse==8)
  firstW=null
}

let firstW;
export function removeConnection(e,setMouse,setConnectionArray) {
  const secondNode = e.target.id;
  if (!firstW) {
    firstW = secondNode;
  } else if (firstW != secondNode) 
  {
    setConnectionArray(prevConnections => {
      return prevConnections.filter(pair => {
        return !(pair.includes(firstW) && pair.includes(secondNode));
      });
    });
    setMouse(0);
    firstW = null;
  }
  else alert("Two Nodes Can not be Same")
}

let firstNode;

export function message(e, message_in, setMouse, setNodes) {
  const secondNode = e.target.id;
  if (secondNode.startsWith("R")) {
    alert("Select a Node");
    return;
  }
  if (!firstNode) {
    firstNode = secondNode;
    setNodes([firstNode]);
    document.body.style.cursor = `url(${message_in}), auto`;
    console.log("Select another node to send message...");
  } else if (firstNode != secondNode) {
    setNodes([firstNode, secondNode]);
    setMouse(0);
    firstNode = null;
  } else {
    alert("Two nodes cannot be same");
    firstNode = null;
  }
}

export function handleDragEnd(e, appData, setAppData) {
  const offsetX = e.clientX;
  const offsetY = e.clientY;

  const containerRect = document
    .getElementById("container")
    .getBoundingClientRect();
  const x = offsetX - containerRect.left;
  const y = offsetY - containerRect.top;

  const objectIndex = appData.findIndex((item) => item.id == e.target.id);
  if (objectIndex !== -1) {
    const updatedAppData = [...appData];
    updatedAppData[objectIndex].x = x - 15;
    updatedAppData[objectIndex].y = y - 15;
    setAppData(updatedAppData);
  }
}

export function handleDragOver(e) {
  e.preventDefault();
}

export function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", ""); // Necessary for Firefox to allow dragging
}
