import axios from "axios";
import React, {useEffect, useState} from "react";
import { API_DUMMY } from "../utils/BaseUrl";
import Logo from "../assets/Logo.png"
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function RiwayatBuyer() {
    const [buyer, setBuyer] = useState([]);

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
                <nav className="grid grid-cols-2 bg-gray-100 shadow-lg">
                                <div className="flex items-center gap-4 py-4 px-6">
                                    <img 
                                        src={Logo} 
                                        alt="Logo" 
                                        className="w-16 h-16 bg-white p-2 rounded-full border border-gray-300 shadow-sm"
                                    />
                                    <h1 className="font-extrabold text-2xl text-gray-700">
                                        Dashboard Admin
                                    </h1>
                                </div>
                                <div>
                                    <ul className="flex gap-5 py-10 justify-center">
                                    <li>
                                            <a href="/add"
                                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300"
                                            >
                                                Tambah Barang
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/"
                                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300"
                                            >
                                                Menu Barang
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/riwayatBuyer"
                                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300"
                                            >
                                                Riwayat Pembelian
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
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
                                <Link to={`/detail/${row.id}`} style={{ 
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