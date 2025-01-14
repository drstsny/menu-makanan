import React from "react";
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Makanan from "./makanan/Makanan";
import Register from "./pages/Register"
import Login from "./pages/login"
import Add from "./pages/Add"
import Data from "./pages/Data"
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";


export function App ()  {
  return(
    <Router>
      <Routes>
        <Route path="/makanan" element={<Makanan/>}/>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/data" element={<Data/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </Router>
  );
};

export default App;