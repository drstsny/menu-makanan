import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/BaseUrl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Card, CardContent, CardMedia, CircularProgress, Box } from "@mui/material";

function Buy() {
    const { id } = useParams();
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [jumlah, setJumlah] = useState(1);
    const [makanan, setMakanan] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nama.trim()) {
            Swal.fire({ icon: "error", title: "Nama tidak boleh kosong!", timer: 1500 });
            return;
        }

        if (!alamat.trim()) {
            Swal.fire({ icon: "error", title: "Alamat tidak boleh kosong!", timer: 1500 });
            return;
        }

        if (isNaN(jumlah) || jumlah < 1) {
            Swal.fire({ icon: "error", title: "Jumlah harus minimal 1!", timer: 1500 });
            return;
        }

        if (jumlah > makanan.stok_barang) {
            Swal.fire({ icon: "error", title: "Jumlah melebihi stok!", timer: 1500 });
            return;
        }

        try {
            await axios.post(`${API_DUMMY}/api/barang/api/barang/buy/${id}`, { jumlah });
            await axios.post(`${API_DUMMY}/api/buyer/buyer`, {
                nama: nama,
                nama_barang: makanan.nama_barang,
                jumlah: jumlah,
                alamat: alamat,
            });

            Swal.fire({ icon: "success", title: "Pesanan berhasil dibuat!", timer: 1500 });
            setNama("");
            setAlamat("");
            setJumlah(1);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            Swal.fire({ icon: "error", title: "Terjadi kesalahan", text: error.message });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_DUMMY}/api/barang/${id}`);
                setMakanan(response.data);
            } catch (error) {
                console.error("Gagal memuat data:", error);
                Swal.fire({ icon: "error", title: "Gagal memuat data barang", text: error.message });
            }
        };
    
        fetchData();
        const token = sessionStorage.getItem("token");
        
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Anda harus login terlebih dahulu!",
                timer: 1500,
            }).then(() => {
                navigate("/login");
            });
        }
        
    }, [id]);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {makanan ? (
                <Card sx={{ p: 3, boxShadow: 3 }}>
                    <Typography variant="h5" align="center" gutterBottom>Form Pembelian</Typography>
                    <CardMedia component="img" image={makanan.link_gambar} alt="Barang" sx={{ height: 400, objectFit: "cover", borderRadius: 2 }} />
                    <CardContent>
                        <Typography variant="h6" gutterBottom>{makanan.nama_barang}</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField 
                                fullWidth 
                                label="Nama Pembeli" 
                                value={nama} 
                                onChange={(e) => setNama(e.target.value)} 
                                margin="normal" 
                                required />
                            <TextField 
                                fullWidth 
                                label="Jumlah Barang" 
                                type="number" 
                                value={jumlah} 
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setJumlah(value > 0 ? value : 1);
                                }}
                                
                                inputProps={{ min: 1, max: makanan.stok_barang }} margin="normal" 
                                required />
                            <TextField 
                                fullWidth 
                                label="Alamat Pengiriman" 
                                value={alamat} onChange={(e) => setAlamat(e.target.value)} multiline rows={4} margin="normal" required />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Konfirmasi Pembelian</Button>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}
        </Container>
    );
}

export default Buy;
