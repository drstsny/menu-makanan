import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2"; 
import { API_DUMMY } from "../utils/BaseUrl";
import Logo from "../assets/Logo.png"

function Data() {
    const [barang, setBarang] = useState([]);

    const getAll = () => {
        axios
            .get(`${API_DUMMY}/api/barang`)
            .then((res) => {
                setBarang(res.data);
            })
            .catch((error) => {
                alert("Terjadi kesalahan: " + error);
            });
    };

    const deleteBarang = async (id) => {
        Swal.fire({
            title: "Apakah Ingin Di Hapus?",
            text: "Data kamu tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${API_DUMMY}/api/barang/api/barang/${id}` )
                    .then(() => {
                        setBarang(barang.filter(item => item.id !== id));
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil menghapus Data",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal menghapus Barang",
                            timer: 1500,
                        })
                    });
            }
        });
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="max-w-full m-auto p-5 bg-bl">
            <nav className="grid grid-cols-2 bg-gray-100 shadow-lg sticky top-0">
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
                        <th style={{ padding: "10px", textAlign: "left" }}>Harga</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Stok</th>
                        <th style={{ padding: "10px", textAlign: "center" }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {barang.map((row, index) => (
                        <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px", textAlign: "center" }}>{index + 1}</td>
                            <td style={{ padding: "10px" }}>{row.nama_barang}</td>
                            <td style={{ padding: "10px" }}>{row.harga_barang}</td>
                            <td style={{ padding: "10px" }}>{row.stok_barang}</td>
                            <td style={{ padding: "10px", textAlign: "center" }}>
                                <Link to={`/edit/${row.id}`} style={{ 
                                        margin: "0 5px", 
                                        textDecoration: "none" }}>
                                    <button style={{ 
                                        padding: "5px 10px", 
                                        background: "#ffc107", 
                                        color: "#fff", border: "none", 
                                        borderRadius: "3px", 
                                        cursor: "pointer" }}
                                        >Edit</button>
                                </Link>
                                <button 
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
                                </button>
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
    );
}

export default Data;
