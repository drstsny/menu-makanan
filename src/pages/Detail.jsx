import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import { Card, CardContent, CardMedia, Typography, Button, Container, CircularProgress, Box } from "@mui/material";

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
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Detail Barang
            </Typography>
            {makanan ? (
                <Card sx={{ display: 'flex', boxShadow: 3, borderRadius: 2 }}>
                    <CardMedia
                        component="img"
                        image={makanan.link_gambar}
                        alt="Barang"
                        sx={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 2, m: 2 }}
                    />
                    <CardContent>
                        <Typography variant="h6">{makanan.nama_barang}</Typography>
                        <Typography variant="body1" color="text.secondary">Harga: {makanan.harga_barang}</Typography>
                        <Typography variant="body1" color="text.secondary">Jenis: {makanan.jenis_barang}</Typography>
                        <Typography variant="body1" color="text.secondary">Deskripsi: {makanan.deskripsi_barang}</Typography>
                        <Typography variant="body1" color="text.secondary">Stok: {makanan.stok_barang}</Typography>
                        <Typography variant="body1" color="text.secondary">Tanggal Kadaluarsa: {makanan.tanggal_kadaluarsa}</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}
            <Box display="flex" justifyContent="center" mt={4}>
                <Button component={Link} to="/data" variant="contained" color="primary">
                    Kembali
                </Button>
            </Box>
        </Container>
    );
}

export default Detail;
