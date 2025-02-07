import React, { useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent, Box } from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../utils/BaseUrl";
import Swal from "sweetalert2";
import { uploadImageToS3 } from "../utils/UploadToS3";
import { useNavigate } from "react-router-dom";

function Add() {
    const navigate = useNavigate();
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
            if (link_gambar) {
                imageUrl = await uploadImageToS3(link_gambar);
            }
            const response = await axios.post(`${API_DUMMY}/api/barang`, {
                nama_barang,
                harga_barang,
                jenis_barang,
                deskripsi_barang,
                stok_barang,
                link_gambar: imageUrl,
                tanggal_kadaluarsa,
            });

            if (response.data.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil Ditambahkan",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    navigate("/data");
                }, 1500);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Data Gagal Ditambahkan",
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal menambahkan barang",
                showConfirmButton: false,
                timer: 1500,
            });
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Form Tambah Barang
                    </Typography>
                    <Box component="form" onSubmit={addData} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField 
                            label="Nama Barang"    
                            value={nama_barang} 
                            onChange={(e) => setNama(e.target.value)} 
                            required />
                        <TextField 
                            label="Harga Barang" 
                            type="number" 
                            value={harga_barang} 
                            onChange={(e) => setHarga(e.target.value)} 
                            required />
                        <TextField 
                            label="Jenis Barang" 
                            value={jenis_barang} 
                            onChange={(e) => setJenis(e.target.value)} 
                            required />
                        <TextField 
                            label="Deskripsi Barang" 
                            multiline 
                            rows={3} 
                            value={deskripsi_barang} 
                            onChange={(e) => setDeskripsi(e.target.value)} 
                            required />
                        <TextField 
                            label="Stok Barang" 
                            type="number" 
                            value={stok_barang} 
                            onChange={(e) => setStok(e.target.value)} 
                            required />
                        <TextField
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setLink(e.target.files[0])} 
                            required />
                        <TextField 
                            label="Tanggal Kadaluarsa" 
                            type="date" InputLabelProps={{ shrink: true }} 
                            value={tanggal_kadaluarsa} 
                            onChange={(e) => setTanggal_Kadaluarsa(e.target.value)} 
                            required />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth>
                            Tambah Barang
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Add;
