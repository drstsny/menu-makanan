import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import Swal from "sweetalert2";

function Edit() {
    const history = useNavigate();
    const { id } = useParams(); 
    const [nama_barang, setNama] = useState("");
    const [harga_barang, setHarga] = useState("");
    const [jenis_barang, setJenis] = useState("");
    const [deskripsi_barang, setDeskripsi] = useState("");
    const [stok_barang, setStok] = useState("");
    const [link_gambar, setLink] = useState("");
    const [tanggal_kadaluarsa, setTanggal_Kadaluarsa] = useState("");

    useEffect(() => {
        axios
            .get(`${API_DUMMY}/api/barang/${id}` )
            .then((response) => {
                const barang = response.data;
                setNama(barang.nama_barang || "");
                setHarga(barang.harga_barang || "");
                setJenis(barang.jenis_barang || "");
                setDeskripsi(barang.deskripsi_barang || "");
                setStok(barang.stok_barang || ""); 
                setLink(barang.link_gambar || "");
                setTanggal_Kadaluarsa(barang.tanggal_kadaluarsa || "");
            })
            .catch((error) => {
                alert("Terjadi kesalahan: " + error);
            });
    }, [id]);          

    const edit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.put(`${API_DUMMY}/api/barang/${id}`, {
                nama_barang,
                harga_barang,
                jenis_barang,
                deskripsi_barang,
                stok_barang,
                link_gambar,
                tanggal_kadaluarsa,
            });
            
            Swal.fire ({
                icon: "success",
                title: "Berhasil mengubah Data",
                showConfirmButton: false,
                timer: 1500,
            });
            history("/data");
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan saat mengedit data.");
        }
    };
    function BuyButton () {
        return
    }

    const containerStyle = {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    };

    const titleStyle = {
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#333",
    };

    const cardStyle = {
        background: "#f9f9f9",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const formGroupStyle = {
        marginBottom: "15px",
    };

    const labelStyle = {
        fontWeight: "bold",
        marginBottom: "5px",
        display: "block",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Form Edit Data</h1>
            <div style={cardStyle}>
                <Form onSubmit={edit}>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Nama Barang</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            name="nama"
                            id="nama"
                            value={nama_barang}
                            onChange={(e) => setNama(e.target.value)}
                            type="text"
                            placeholder="Nama Barang"
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Harga Barang</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="number"
                            name="harga"
                            id="harga"
                            value={harga_barang}
                            onChange={(e) => setHarga(e.target.value)}
                            placeholder="Harga Barang"
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Jenis Barang</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="text"
                            name="jenis"
                            id="jenis"
                            value={jenis_barang}
                            onChange={(e) => setJenis(e.target.value)}
                            placeholder="Jenis Barang"
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Deskripsi Barang</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="text"
                            name="text"
                            id="deskripsi"
                            value={deskripsi_barang}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            placeholder="Deskripsi Barang"
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Stok Barang</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="text"
                            name="stok"
                            id="stok"
                            value={stok_barang}
                            onChange={(e) => setStok(e.target.value)}
                            placeholder="Stok Barang"
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Link Gambar</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="url"
                            name="link_gambar"
                            id="link_gambar"
                            value={link_gambar}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Link Gambar"
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Tanggal Kadaluarsa</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="date"
                            name="tanggal_kadaluarsa"
                            id="tanggal_kadaluarsa"
                            value={tanggal_kadaluarsa}
                            onChange={(e) => setTanggal_Kadaluarsa(e.target.value)}
                            placeholder="Tanggal Kadaluarsa"
                        />
                    </Form.Group>
                    <Button type="submit" style={buttonStyle}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Edit;
