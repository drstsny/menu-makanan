// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { API_DUMMY } from "../utils/BaseUrl";
import "./style/AddEdit.css"
import Swal from "sweetalert2";

function Add() {
    const [nama_barang, setNama] = useState("");
    const [harga_barang, setHarga] = useState("");
    const [jenis_barang, setJenis] = useState("");
    const [deskripsi_barang, setDeskripsi] = useState("");
    const [stok_barang, setStok] = useState("");
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
                tanggal_kadaluarsa,
            });
            Swal.fire({
                icon: "succes",
                title: "Berhasil menambahkan Data",
                timer:1500,
            })
            setNama("");
            setHarga("");
            setJenis("");
            setDeskripsi("");
            setStok("");
            setTanggal_Kadaluarsa("");
        } catch (error) {
            console.log(error);
            alert("Gagal menambahkan barang. Coba lagi!");
        }
    };

    return (
        <div className="container">
            <h1 className="title">Form Tambah Barang</h1>
            <div className="wrapper">
                <div className="card">
                    <Form onSubmit={addData} className="content">
                        <Form.Group className="group">
                            <Form.Label className="label">Nama Barang:</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                placeholder="Masukkan nama barang"
                                value={nama_barang}
                                onChange={(e) => setNama(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="group">
                            <Form.Label className="label">Harga Barang:</Form.Label>
                            <Form.Control
                                className="input"
                                type="number"
                                placeholder="Masukkan harga barang"
                                value={harga_barang}
                                onChange={(e) => setHarga(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="group">
                            <Form.Label className="label">Jenis Barang:</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                placeholder="Masukkan jenis barang"
                                value={jenis_barang}
                                onChange={(e) => setJenis(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="group">
                            <Form.Label className="label">Deskripsi Barang:</Form.Label>
                            <Form.Control
                                className="input"
                                as="textarea"
                                rows={3}
                                placeholder="Masukkan deskripsi barang"
                                value={deskripsi_barang}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="group">
                            <Form.Label className="label">Stok Barang:</Form.Label>
                            <Form.Control
                                className="input"
                                type="number"
                                placeholder="Masukkan stok barang"
                                value={stok_barang}
                                onChange={(e) => setStok(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="group">
                            <Form.Label className="label">Tanggal Kadaluarsa:</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                placeholder="Masukkan tanggal kadaluarsa"
                                value={tanggal_kadaluarsa}
                                onChange={(e) => setTanggal_Kadaluarsa(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="button">
                            Tambah Barang
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Add;
