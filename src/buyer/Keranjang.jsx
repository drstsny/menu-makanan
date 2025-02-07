import axios from "axios";
import { useEffect, useState } from "react";
import { API_DUMMY } from "../utils/BaseUrl";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import Logo from "../assets/Keranjang.png";
import { AppBar, Toolbar, Typography, Container, TextField, Button, Grid, Card, CardMedia, CardContent, CardActions, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Keranjang() {
    const [keranjang, setKeranjang] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);

    const getAll = () => {
        axios
            .get(`${API_DUMMY}/api/keranjang`)
            .then((res) => {
                setKeranjang(res.data);
                setError(null);
            })
            .catch(() => {
                setError("Terjadi kesalahan saat memuat data");
            });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_DUMMY}/api/keranjang/api/keranjang?nama_barang=${search}`);
            setKeranjang(response.data);
            setError(null);
        } catch (error) {
            setError("Gagal mencari barang. Silakan coba lagi.");
        }
    };

    const deleteBarang = async (id) => {
        axios
            .delete(`${API_DUMMY}/api/keranjang/${id}`)
            .then(() => {
                setKeranjang(keranjang.filter(item => item.id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Barang Berhasil Dihapus",
                    timer: 1500
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal Menghapus Barang",
                    timer: 1500
                });
            });
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Box display="flex" alignItems="center" gap={2}>
                        <img src={Logo} alt="Logo" width={50} />
                        <Typography variant="h6">Keranjang Belanja</Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="form" onSubmit={handleSearch} display="flex" gap={2} mb={4}>
                <TextField
                    fullWidth
                    label="Cari barang di keranjang..."
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" startIcon={<FaSearch />}>
                    Cari
                </Button>
            </Box>

            {error && <Typography color="error" textAlign="center">{error}</Typography>}

            {keranjang.length === 0 ? (
                <Typography textAlign="center" color="textSecondary">Tidak ada barang ditemukan.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {keranjang.map((row) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={row.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                                <CardMedia component="img" image={row.link_gambar} alt={row.nama_barang} sx={{height: 300 , objectFit: "cover"}}/>
                                <CardContent>
                                    <Typography variant="h6" noWrap>{row.nama_barang}</Typography>
                                    <Typography variant="body2" color="textSecondary">Jumlah: {row.jumlah}</Typography>
                                    <Typography variant="body2" color="textSecondary">Harga: Rp {row.harga_barang}</Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button component={Link} to={`/buy/${row.id}`} variant="contained" color="primary" startIcon={<ShoppingCartIcon />}>Beli</Button>
                                    <IconButton color="error" onClick={() => deleteBarang(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default Keranjang;
