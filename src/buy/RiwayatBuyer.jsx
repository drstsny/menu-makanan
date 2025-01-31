import axios from "axios";
import React, {useEffect, useState} from "react";
import { API_DUMMY } from "../utils/BaseUrl";
import Logo from "../assets/Logo.png"
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function RiwayatBuyer() {
    const [buyer, setBuyer] = useState([]);
    const[menuOpen,setMenuOpen] = useState(false);

    const getAll = () => {
        axios
            .get(`${API_DUMMY}/api/buyer`)
            .then((res) => {
                setBuyer(res.data);
            })
            .catch((error) => {
                alert("Terjadi kesalahan: " + error);
            });
    };
    useEffect(() => {
            getAll();
        }, []);
        return (
            <div className="max-w-full m-auto p-5 bg-bl">
                        <nav className="bg-gray-100 shadow-lg sticky top-0 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <img 
                                    src={Logo} 
                                    alt="Logo" 
                                    className="w-12 h-12 bg-white p-2 rounded-full border border-gray-300 shadow-sm"
                                />
                                <h1 className="font-extrabold text-xl text-gray-700">Dashboard Admin</h1>
            
                            </div>                
                            <div className="hidden md:block space-x-2">
                                <Link to="/add" 
                                    className="bg-green-400 px-5 py-2 rounded-md hover:bg-green-500">
                                        Tambah Brang
                                </Link>
                                <Link to="/"
                                    className="bg-green-400 px-5 py-2 rounded-md hover:bg-green-500">
                                        Menu Barang
                                </Link>
                                <Link to="/riwayatBuyer"
                                    className="bg-green-400 px-5 py-2 rounded-md hover:bg-green-500">
                                        Riwayat Pembeli
                                </Link>
                            </div>
                            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden px-4 py-2  text-black rounded-lg">
                                <FaBars/>
                            </button>
                        </nav>
                        {menuOpen && (
                            <div className="md:hidden bg-white shadow-md py-2">
                                <Link to="/add"
                                    className="block py-2 px-4 text-center text-gray-800 hover:bg-blue-500 hover:text-white"
                                    >Tambah Barang
                                </Link>
                                <Link to="/"
                                    className="block py-2 px-4 text-center text-gray-800 hover:bg-blue-500 hover:text-white"
                                    >Menu Barang
                                </Link>
                                <Link to="/riwayatBuyer"
                                    className="block py-2 px-4 text-center text-gray-800 hover:bg-blue-500 hover:text-white"
                                    >Riwayat Pembelian
                                </Link>
                            </div>
                        )}
                            <Table striped bordered hover style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                        <th style={{ padding: "10px", textAlign: "center" }}>No</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Nama</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Nama Barang</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Jumlah</th>
                        <th style={{ padding: "10px", textAlign: "center" }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {buyer.map((row, index) => (
                        <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px", textAlign: "center" }}>{index + 1}</td>
                            <td style={{ padding: "10px" }}>{row.nama}</td>
                            <td style={{ padding: "10px" }}>{row.nama_barang}</td>
                            <td style={{ padding: "10px" }}>{row.jumlah}</td>
                            <td style={{ padding: "10px", textAlign: "center" }}>
                                {/* <button 
                                    style={{ 
                                        padding: "5px 10px", 
                                        background: "#dc3545", 
                                        color: "#fff", 
                                        border: "none", 
                                        borderRadius: "3px", 
                                        cursor: "pointer", 
                                        margin: "0 5px" }} 
                                    onClick={() => deleteBarang(row.id)}
                                >
                                    Hapus
                                </button> */}
                                <Link to={`/detailBuyer/${row.id}`} style={{ 
                                        margin: "0 5px", 
                                        textDecoration: "none" }}>
                                    <button style={{ 
                                        padding: "5px 10px", 
                                        background: "#17a2b8", 
                                        color: "#fff", 
                                        border: "none", 
                                        borderRadius: "3px", 
                                        cursor: "pointer" }}
                                        >Detail</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        )
    }

    export default RiwayatBuyer;