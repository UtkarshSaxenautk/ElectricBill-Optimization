import { render } from "react-dom";

import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";


const App = () => {
  return (
    <StrictMode>
      
        <BrowserRouter>
          
          <Routes>
            {/* <Route path="/details/:id" element={<Details />} /> */}
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
  
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));