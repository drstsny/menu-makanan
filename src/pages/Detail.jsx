import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import "./style/Detail.css"

function Detail() {
    const { id } = useParams();
    const [makanan, setMakanan] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_DUMMY}/api/barang/${id}`)
            .then((response) => setMakanan(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]); 

    return (
        <div className="container">
            <h1 className="header">Detail Barang</h1>
            {makanan ? (
                <div className="card">
                    <h3 className="title">
                        <span className="id">{makanan.id}</span> {makanan.nama_barang}
                    </h3>
                    <p className="item">Harga: <span>{makanan.harga_barang}</span></p>
                    <p className="item">Jenis: <span>{makanan.jenis_barang}</span></p>
                    <p className="item">Deskripsi: <span>{makanan.deskripsi_barang}</span></p>
                    <p className="item">Stok: <span>{makanan.stok_barang}</span></p>
                    <p className="item">Tanggal Kadaluarsa: <span>{makanan.tanggal_kadaluarsa}</span></p>
                </div>
            ) : (
                <p className="loading-message">Loading...</p>
            )}
            <div className="btn-back">
                <a href="/data">
                    <h1>Kembali</h1>
                </a>
            </div>
        </div>
    );
}

export default Detail;
