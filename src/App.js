import { render } from "react-dom";
import './style.css'
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SelectAppliances from "./components/SelectAppliances";
import Type from "./components/Type";
import ShowAppliances from "./components/ShowAppliances";


const App = () => {
  return (
    <StrictMode>
      
        <BrowserRouter>
          
          <Routes>
            {/* <Route path="/details/:id" element={<Details />} /> */}
            <Route path="/" element={<Home />} />
            <Route path={"/selectappliances"} element={<SelectAppliances />} />
            <Route path={"/type"} element={<Type />} />
            <Route path={"/show"} element={<ShowAppliances />} />

          </Routes>
        </BrowserRouter>
  
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));