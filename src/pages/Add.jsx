// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { API_DUMMY } from "../utils/BaseUrl";
import Swal from "sweetalert2";
import { uploadImageToS3 } from "../utils/UploadToS3";

function Add() {
    const [nama_barang, setNama] = useState("");
    const [harga_barang, setHarga] = useState("");
    const [jenis_barang, setJenis] = useState("");
    const [deskripsi_barang, setDeskripsi] = useState("");
    const [stok_barang, setStok] = useState("");
    const [link_gambar, setLink] = useState(null);
    const [tanggal_kadaluarsa, setTanggal_Kadaluarsa] = useState("");

    const addData = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = link_gambar;

            if(link_gambar) {
                imageUrl = await uploadImageToS3(link_gambar);
            }
            const response = await axios.post
            (`${API_DUMMY}/api/barang`, 
                {
                nama_barang: nama_barang,
                harga_barang: harga_barang,
                jenis_barang: jenis_barang,
                deskripsi_barang: deskripsi_barang,
                stok_barang: stok_barang,
                link_gambar: imageUrl,
                tanggal_kadaluarsa: tanggal_kadaluarsa,
            });

            console.log(response);
            if(response.data.code === 200) {
                setShow(false);
                Swal.fire({
                    icon: "error",
                    title: "Data Gagal di Tambahkan",
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    history.push("/data");
                }, 1500);
            }else {
                
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                history.push("/login")
            }else{
            Swal.fire({
                icon: "error",
                title: "gagal menambahkan barang",
                showConfirmButton: false,
                timer: 1500
            });
            console.log(error);
            
            }   
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
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLink(e.target.files[0])}
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
