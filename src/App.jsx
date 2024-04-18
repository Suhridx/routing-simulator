import logo from "./assets/neural-network.png";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div style={{height:"100vh", alignContent:"center"}}>
      <div>
        
          <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <h1>Welcome To Routing Simulator</h1>
      <div className="card">
        <Link to="/sim">
          <button className="button-35">Start</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
