import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import { Box, Typography, Card, CardContent, Container, Button, CircularProgress } from "@mui/material";

function DetailBuyer() {
    const { id } = useParams();
    const [buyer, setBuyer] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_DUMMY}/api/buyer/${id}`)
            .then((response) => setBuyer(response.data))
            .catch((error) => console.error("Error fetching data", error));
    }, [id]);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                Detail Pembelian
            </Typography>

            {buyer ? (
                <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                    <CardContent>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Nama:</strong> {buyer.nama}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Alamat:</strong> {buyer.alamat}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Nama Barang:</strong> {buyer.nama_barang}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Jumlah:</strong> {buyer.jumlah}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}
            <Button 
                component={Link} to={`/riwayatBuyer`}
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3, py: 1.5, fontWeight: "bold", borderRadius: 2, '&:hover': { backgroundColor: '#1565c0' } }}
            >
                Kembali
            </Button>
        </Container>
    );
}

export default DetailBuyer;
