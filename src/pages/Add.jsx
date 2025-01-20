// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { API_DUMMY } from "../utils/BaseUrl";
import Swal from "sweetalert2";

function Add() {
    const [nama_barang, setNama] = useState("");
    const [harga_barang, setHarga] = useState("");
    const [jenis_barang, setJenis] = useState("");
    const [deskripsi_barang, setDeskripsi] = useState("");
    const [stok_barang, setStok] = useState("");
    const [link_gambar, setLink] = useState("");
    const [tanggal_kadaluarsa, setTanggal_Kadaluarsa] = useState("");

    const addData = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${API_DUMMY}/api/barang`, {
                nama_barang,
                harga_barang,
                jenis_barang,
                deskripsi_barang,
                stok_barang,
                link_gambar,
                tanggal_kadaluarsa,
            });
            Swal.fire({
                icon: "success",
                title: "Berhasil menambahkan Data",
                timer: 1500,
            });
            setNama("");
            setHarga("");
            setJenis("");
            setDeskripsi("");
            setStok("");
            setLink("");
            setTanggal_Kadaluarsa("");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "gagal menambahkan barang",
                timer: 1500
            })
        }
    };

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
            <div>
                <h1 style={titleStyle}>Form Tambah Barang</h1>
            </div>
            <div style={cardStyle}>
                <Form onSubmit={addData}>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Nama Barang:</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="text"
                            placeholder="Masukkan nama barang"
                            value={nama_barang}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Harga Barang:</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="number"
                            placeholder="Masukkan harga barang"
                            value={harga_barang}
                            onChange={(e) => setHarga(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Jenis Barang:</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="text"
                            placeholder="Masukkan jenis barang"
                            value={jenis_barang}
                            onChange={(e) => setJenis(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Deskripsi Barang:</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            as="textarea"
                            rows={3}
                            placeholder="Masukkan deskripsi barang"
                            value={deskripsi_barang}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Stok Barang:</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="number"
                            placeholder="Masukkan stok barang"
                            value={stok_barang}
                            onChange={(e) => setStok(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Link Gambar:</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="url"
                            placeholder="Masukkan Link Gambar"
                            value={link_gambar}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Tanggal Kadaluarsa:</Form.Label>
                        <Form.Control
                            style={inputStyle}
                            type="text"
                            placeholder="Masukkan tanggal kadaluarsa"
                            value={tanggal_kadaluarsa}
                            onChange={(e) => setTanggal_Kadaluarsa(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" style={buttonStyle}>
                        Tambah Barang
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Add;
