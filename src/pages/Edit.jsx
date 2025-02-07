import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import Swal from "sweetalert2";
import { uploadImageToS3 } from "../utils/UploadToS3";
import { Container, TextField, Button, Typography, Card, CardContent, Box } from "@mui/material";

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
            let imageUrl = link_gambar;

            if(link_gambar && link_gambar instanceof File) {
                imageUrl = await uploadImageToS3(link_gambar);
            }

            await axios.put(`${API_DUMMY}/api/barang/${id}`, {
                nama_barang,
                harga_barang,
                jenis_barang,
                deskripsi_barang,
                stok_barang,
                link_gambar: imageUrl,
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

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Form Edit Data
            </Typography>
            <Card>
                <CardContent>
                    <form onSubmit={edit}>
                        <TextField fullWidth margin="normal" label="Nama Barang" value={nama_barang} onChange={(e) => setNama(e.target.value)} required />
                        <TextField fullWidth margin="normal" label="Harga Barang" type="number" value={harga_barang} onChange={(e) => setHarga(e.target.value)} required />
                        <TextField fullWidth margin="normal" label="Jenis Barang" value={jenis_barang} onChange={(e) => setJenis(e.target.value)} required />
                        <TextField fullWidth margin="normal" label="Deskripsi Barang" value={deskripsi_barang} onChange={(e) => setDeskripsi(e.target.value)} required />
                        <TextField fullWidth margin="normal" label="Stok Barang" type="number" value={stok_barang} onChange={(e) => setStok(e.target.value)} required />
                        <input type="file" onChange={(e) => setLink(e.target.files[0])} required style={{ marginTop: '16px' }} />
                        <TextField fullWidth margin="normal" label="Tanggal Kadaluarsa" type="date" InputLabelProps={{ shrink: true }} value={tanggal_kadaluarsa} onChange={(e) => setTanggal_Kadaluarsa(e.target.value)} required />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Edit;
