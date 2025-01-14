import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import "./style/AddEdit.css"

function Edit() {
    const history = useNavigate();
    const { id } = useParams(); 
    const [nama_barang, setNama] = useState("");
    const [harga_barang, setHarga] = useState("");
    const [jenis_barang, setJenis] = useState("");
    const [deskripsi_barang, setDeskripsi] = useState("");
    const [stok_barang, setStok] = useState("");
    const [tanggal_kadaluarsa, setTanggal_Kadaluarsa] = useState("");

    useEffect(() => {
        axios
            .get(`${API_DUMMY}/api/barang/${id}` )
            .then((response) => {
                const makanan = response.data;
                    setNama(makanan.nama_barang || "");
                    setHarga(makanan.harga_barang || "");
                    setJenis(makanan.jenis_barang || "");
                    setDeskripsi(makanan.deskripsi_barang || "");
                    setStok(makanan.stok_barang || "");
                    setTanggal_Kadaluarsa(makanan.tanggal_kadaluarsa || "");
                })
                .catch((error) => {
                    alert("terjadi kesalahan sir" + error);
                });
            }, []);          
    

    const edit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.put(`${API_DUMMY}/api/barang/${id}`, {
                nama_barang,
                harga_barang,
                jenis_barang,
                deskripsi_barang,
                stok_barang,
                tanggal_kadaluarsa,
            });
            
            alert("Data berhasil diubah.");
            history("/data")
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan saat mengedit data.");
        }
    };
    

    return (
    <div className="container">
        <h1 className="title">Form Edit Data</h1>
        <div className="wrapper">
            <div className="card">
            <Form onSubmit={edit} className="content">
            <Form.Group className="group">
            <Form.Label className="label">Nama Barang</Form.Label>
            <Form.Control
                className="input"
                name="nama"
                id="nama"
                value={nama_barang}
                onChange={(e) => setNama(e.target.value)}
                type="text"
                placeholder="Nama Barang"
                />
            </Form.Group>
            <Form.Group className="group">
            <Form.Label className="label">Harga Barang</Form.Label>
            <Form.Control
                className="input"
                type="number"
                name="harga"
                id="harga"
                value={harga_barang}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Harga Barang"
                />
            </Form.Group>
            <Form.Group className="group">
            <Form.Label className="label">Jenis Barang</Form.Label>
            <Form.Control
                className="input"
                type="text"
                name="jenis"
                id="jenis"
                value={jenis_barang}
                onChange={(e) => setJenis(e.target.value)}
                placeholder="Jenis Barang"
                />
            </Form.Group>
            <Form.Group className="group">
            <Form.Label className="label">Deskripsi Barang</Form.Label>
            <Form.Control
                className="input"
                type="text"
                name="text"
                id="deskripsi"
                value={deskripsi_barang}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsi Barang"
                />
            </Form.Group>
            <Form.Group className="group">
            <Form.Label className="label">Stok Barang</Form.Label>
            <Form.Control
                className="input"
                type="text"
                name="stok"
                id="stok"
                value={stok_barang}
                onChange={(e) => setStok(e.target.value)}
                placeholder="Stok Barang"
                />
            </Form.Group>
            <Form.Group className="group">
            <Form.Label className="label">Tanggal Kadaluarsa</Form.Label>
            <Form.Control
                className="input"
                type="date"
                name="tanggal_kadaluarsa"
                id="tanggal_kadaluarsa"
                value={tanggal_kadaluarsa}
                onChange={(e) => setTanggal_Kadaluarsa(e.target.value)}
                placeholder="Tanggal Kadaluarsa"
                />
            </Form.Group>
            <Button type="submit" className="button">
                Submit
            </Button>
            </Form>
            </div>
        </div>
    </div>
    );
}

export default Edit;
