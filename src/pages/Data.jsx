import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2"; 
import { API_DUMMY } from "../utils/BaseUrl";
import Logo from "../assets/Logo.png"
import { FaBars } from "react-icons/fa";

function Data() {
    const [barang, setBarang] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

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
                    .delete(`${API_DUMMY}/api/barang/api/barang/${id}`)
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
            <div className="overflow-x-auto mt-5">
                <Table striped bordered hover className="w-full text-sm md:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-center">No</th>
                            <th className="p-2 text-left">Nama</th>
                            <th className="p-2 text-left">Harga</th>
                            <th className="p-2 text-left">Stok</th>
                            <th className="p-2 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barang.map((row, index) => (
                            <tr key={row.id} className="border-b">
                                <td className="p-2 text-center">{index + 1}</td>
                                <td className="p-2">{row.nama_barang}</td>
                                <td className="p-2">{row.harga_barang}</td>
                                <td className="p-2">{row.stok_barang}</td>
                                <td className="p-2 text-center flex flex-wrap justify-center gap-2">
                                    <Link to={`/edit/${row.id}`} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Edit</Link>
                                    <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600" onClick={() => deleteBarang(row.id)}>Hapus</button>
                                    <Link to={`/detail/${row.id}`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Detail</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Data;
