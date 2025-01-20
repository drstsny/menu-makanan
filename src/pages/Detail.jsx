import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";

function Detail() {
    const { id } = useParams();
    const [makanan, setMakanan] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_DUMMY}/api/barang/${id}`)
            .then((response) => setMakanan(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    const containerStyle = {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    };

    const headerStyle = {
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#333",
    };

    const cardStyle = {
        display: "flex",
        alignItems: "center",
        background: "#f9f9f9",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const imageStyle = {
        width: "200px",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
        marginRight: "20px",
    };

    const detailStyle = {
        flex: "1",
    };

    const itemStyle = {
        marginBottom: "10px",
        fontSize: "1rem",
        color: "#555",
    };

    const buttonStyle = {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        background: "#007bff",
        borderRadius: "10px",
        height: "40px",
    };

    const linkStyle = {
        textDecoration: "none",
        color: "#f9f9f9",
        fontSize: "1.2rem",
        fontWeight: "bold",
        padding: "5px"
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Detail Barang</h1>
            {makanan ? (
                <div style={cardStyle}>
                    <img
                        src={makanan.link_gambar}
                        alt="Barang"
                        style={imageStyle}
                    />
                    <div style={detailStyle}>
                        <h3>
                            <span>{makanan.nama_barang}</span>
                        </h3>
                        <p style={itemStyle}>
                            Harga: <span>{makanan.harga_barang}</span>
                        </p>
                        <p style={itemStyle}>
                            Jenis: <span>{makanan.jenis_barang}</span>
                        </p>
                        <p style={itemStyle}>
                            Deskripsi: <span>{makanan.deskripsi_barang}</span>
                        </p>
                        <p style={itemStyle}>
                            Stok: <span>{makanan.stok_barang}</span>
                        </p>
                        <p style={itemStyle}>
                            Tanggal Kadaluarsa:{" "}
                            <span>{makanan.tanggal_kadaluarsa}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
                    Loading...
                </p>
            )}
            <a href="/data" style={buttonStyle}>
                <button style={linkStyle}>
                    Kembali
                </button>
            </a>
        </div>
    );
}

export default Detail;
