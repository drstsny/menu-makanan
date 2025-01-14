import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2"; 
import { API_DUMMY } from "../utils/BaseUrl";
import "./style/Data.css";

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
                    .delete(`${API_DUMMY}/api/barang/api/barang/` +id)
                    .then(() => {
                        setBarang(barang.filter(item => item.id !== id));
                        console.log
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil menghapus Data",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        alert("Terjadi kesalahan saat menghapus data: " + error);
                    });
            }
        });
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="container">
            <h1 className="header">Data Barang</h1>
            <Table striped bordered hover className="custom-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {barang.map((row, index) => (
                        <tr key={row.id}>
                            <td>{index + 1}</td>
                            <td>{row.nama_barang}</td>
                            <td>{row.harga_barang}</td>
                            <td>{row.stok_barang}</td>
                            <td className="action">
                                <Link to={`/edit/${row.id}`}>
                                    <button className="btn-edit">Edit</button>
                                </Link>
                                <button className="btn-delete" onClick={() => deleteBarang(row.id)}>
                                    Hapus
                                </button>
                                <Link to={`/detail/${row.id}`}>
                                    <button className="btn-detail">Detail</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="add-button">
                <a href="/add">
                    <h1>Tambah Barang</h1>
                </a>
            </div>
        </div>

    );
}

export default Data;
