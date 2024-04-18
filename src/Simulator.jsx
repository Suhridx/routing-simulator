import React, { useEffect, useState } from "react";
import { Top } from "./Top";
import Middle from "./Middle";
import Result from "./utils/Result";

const Simulator = () => {
  const [isLoading, setIsLoading] = useState();
  const [show,setShow] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1150);
  }, []);

  return isLoading ? (
    <div style={{ position: "relative", top: "50vh" }}>
      <div className="loader"></div>
    </div>
  ) : (
    <div
      style={{
        animation: "zoom-out 0.6s ease",
        display: "flex",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <Top setShow={setShow} />
      <Middle />
      {show &&<Result setShow={setShow}/>}
      <footer
        style={{
          fontSize: "12px",
          font: "thin",
          background:
            " linear-gradient(90deg, rgba(255,255,255,1) 11%, rgba(191,191,186,1) 50%, rgba(255,255,255,1) 89%)",
        }}
      >
        Designed By SUHRID ♦ v3.0.1
      </footer>
    </div>
  );
};

export default Simulator;
