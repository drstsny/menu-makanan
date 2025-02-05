import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Makanan from "./makanan/Makanan";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Add from "./pages/Add";
import Data from "./pages/Data";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import Minuman from "./minuman/Minuman";
import Buy from "./buy/Buy";
import MakananRingan from "./makanan_ringan/MakananRingan";
import RiwayatBuyer from "./buy/RiwayatBuyer";
import Keranjang from "./buy/Keranjang";
import DetailBuyer from "./buy/DetailBuyer";

export function App() {
  return (
    <Box>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Makanan />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<Add />} />
          <Route path="/data" element={<Data />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Detail />} />
          {/* <Route path="/minuman" element={<Minuman />} /> */}
          <Route path="/buy/:id" element={<Buy />} />
          {/* <Route path="/makananRingan" element={<MakananRingan />} /> */}
          <Route path="/riwayatBuyer" element={<RiwayatBuyer />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/detailBuyer/:id" element={<DetailBuyer />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
