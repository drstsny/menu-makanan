import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import Makanan from "./makanan/Makanan";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Add from "./pages/Add";
import Data from "./pages/Data";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import Buy from "./buyer/Buy";
import RiwayatBuyer from "./buyer/RiwayatBuyer";
import Keranjang from "./buyer/Keranjang";
import DetailBuyer from "./buyer/DetailBuyer";

export function App() {
  return (
      <Router>
          <Routes>
              {/* Rute yang bisa diakses tanpa login */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Makanan />} />

              {/* Rute yang butuh login (DILINDUNGI) */}
              <Route path="/data" element={<ProtectedRoute><Data /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><Add /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
              <Route path="/detail/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
              <Route path="/buy/:id" element={<ProtectedRoute><Buy /></ProtectedRoute>} />
              <Route path="/riwayatBuyer" element={<ProtectedRoute><RiwayatBuyer /></ProtectedRoute>} />
              <Route path="/keranjang" element={<ProtectedRoute><Keranjang /></ProtectedRoute>} />
              <Route path="/detailBuyer/:id" element={<ProtectedRoute><DetailBuyer /></ProtectedRoute>} />
          </Routes>
      </Router>
  );
}

export default App;
