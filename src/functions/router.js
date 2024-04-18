export default function simulator(connectionArray,nodes,setSimulate,setPathArray)
{
    console.log("Simulating");
    setTimeout(() => {
      const paths = findShortestPath(connectionArray, nodes[0], nodes[1]);
      console.log(paths);
      setPathArray(paths)
      setSimulate(2)
    }, 1000);
    
 
}


  
// function findPaths(connections, startNode, endNode) {
//     console.log("Connections:", connections);
//     console.log("Start Node:", startNode);
//     console.log("End Node:", endNode);
  
//     const visited = new Set();
//     const paths = [];
  
//     function dfs(node, path) {
//       if (node === endNode) {
//         paths.push(path);
//         return;
//       }
//       visited.add(node);
//       for (const [from, to] of connections) {
//         if ((from === node) && !visited.has(to)) {
//           dfs(to, [...path, [from, to]]);
//         }
//         else if((to === node) && !visited.has(from)){
//             dfs(from, [...path, [to, from]]);
//         }
//       }
//       visited.delete(node);
//     }
  
//     dfs(startNode, []);
  
//     return paths;
//   }
  

  function findShortestPath(connections, startNode, endNode) {
    const queue = [[startNode]];
    const visited = new Set([startNode]);

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];

        if (node === endNode) {
            return path;
        }

        for (const [from, to] of connections) {
            if (from === node && !visited.has(to)) {
                visited.add(to);
                queue.push([...path, to]);
            } else if (to === node && !visited.has(from)) {
                visited.add(from);
                queue.push([...path, from]);
            }
        }
    }

    // If no path is found
    return ["0000"];
}

  
  
  