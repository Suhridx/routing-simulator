export const generatePCId = () => {
  const min = 1111;
  const max = 9999;
  let id=Math.floor(Math.random() * (max - min + 1)) + min
  id="P"+id
  return id
};

  export const generateRouterId = () => {
    const min = 1111;
    const max = 9999;
    let id=Math.floor(Math.random() * (max - min + 1)) + min
    id="R"+id
    return id
  };
  
  