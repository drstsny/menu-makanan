import React from "react";
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Makanan from "./makanan/Makanan";
import Register from "./pages/Register"
import Login from "./pages/login"
import Add from "./pages/Add"
import Data from "./pages/Data"
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import Minuman from "./minuman/minuman";
import Buy from "./buy/buy";
import MakananRingan from "./makanan_ringan/MakananRingan";


export function App ()  {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Makanan/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/data" element={<Data/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/minuman" element={<Minuman/>}/>
        <Route path="/buy/:id" element={<Buy/>}/>
        <Route path="/makananRingan" element={<MakananRingan/>}/>
      </Routes>
    </Router>
  );
};

export default App;