import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../utils/BaseUrl";
import Logo from "../../assets/Logo.png";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Grid, Card, CardContent, CardMedia, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, useTheme } from "@mui/material"; 


function Hero() {
    const theme = useTheme();
    const [barang, setBarang] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [kategori, setKategori] = useState("makanan");
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const getAll = (kategori) => {
        axios.get(`${API_DUMMY}/api/barang/${kategori}`)
            .then((res) => {
                setBarang(res.data);
                setError(null);
            })
            .catch((error) => {
                setError("Terjadi kesalahan: " + error);
            });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_DUMMY}/api/barang/api/barang?nama_barang=${search}`);
            setBarang(response.data);
            setError(null);
        } catch (error) {
            setError("Gagal mencari barang. Silakan coba lagi.");
        }
    };

    const addToKeranjang = async (barangId) => {
        try {
            await axios.post(`${API_DUMMY}/api/keranjang/${barangId}`);
            Swal.fire({ icon: "success", title: "Berhasil Menambahkan Ke Keranjang", timer: 1500 });
        } catch (error) {
            alert("Gagal Menambahkan Ke Keranjang", error);
            console.error("Error detail:", error);
        }
    };

    useEffect(() => {
        getAll(kategori);
    }, [kategori]);

    return (
        <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setMenuOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <img src={Logo} alt="Logo" style={{ width: 50, marginRight: 10 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Warung Makan</Typography>
                    {isDesktop && (
                        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', bgcolor: 'white', borderRadius: 1, padding: '2px 5px' }}>
                            <InputBase placeholder="Cari makanan..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ paddingLeft: 1, flex: 1 }} />
                            <IconButton type="submit" color="primary"><FaSearch /></IconButton>
                        </Box>
                    )}
                    <Button color="inherit" component={Link} to="/keranjang"><FaShoppingCart /></Button>
                    <Button color="inherit" component={Link} to="/login"><FaUser /></Button>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
                <List>
                    {isMobile && (
                        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', bgcolor: 'white', borderRadius: 1, padding: '2px 5px' }}>
                        <InputBase placeholder="Cari makanan..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ paddingLeft: 1, flex: 1 }} />
                        <IconButton type="submit" color="primary"><FaSearch /></IconButton>
                    </Box>
                    )}
                    <ListItem button onClick={() => {setKategori("makanan"); setMenuOpen(false);}}>
                        <ListItemText primary="Makanan" />
                    </ListItem>
                    <ListItem button onClick={() => {setKategori("minuman"); setMenuOpen(false);}}>
                        <ListItemText primary="Minuman" />
                    </ListItem>
                    <ListItem button onClick={() => {setKategori("makananRingan"); setMenuOpen(false);}}>
                        <ListItemText primary="Makanan Ringan" />
                    </ListItem>
                </List>
            </Drawer>

            {/* <Box display="flex" justifyContent="center" gap={2} py={2}>
                <Button variant="contained" color={kategori === "makanan" ? "primary" : "secondary"} onClick={() => setKategori("makanan")}>
                    Makanan
                </Button>
                <Button variant="contained" color={kategori === "minuman" ? "primary" : "secondary"} onClick={() => setKategori("minuman")}>
                    Minuman
                </Button>
                <Button variant="contained" color={kategori === "makananRingan" ? "primary" : "secondary"} onClick={() => setKategori("makananRingan")}>
                    Makanan Ringan
                </Button>
            </Box> */}

            {error && <Typography color="error" align="center">{error}</Typography>}
            {barang.length === 0 ? (
                <Typography align="center" color="textSecondary">Tidak ada barang ditemukan.</Typography>
            ) : (
                <Grid container spacing={2} padding={2}>
                    {barang.map((row) => (
                        <Grid item key={row.id} xs={12} sm={6} md={3}>
                            <Card>
                                <CardMedia component="img" image={row.link_gambar} alt={row.nama_barang} sx={{ height: 300, objectFit: "cover" }} />
                                <CardContent>
                                    <Typography variant="h6">{row.nama_barang}</Typography>
                                    <Typography variant="body2" color="textSecondary">Harga: Rp{row.harga_barang}</Typography>
                                    <Typography variant="body2" color="textSecondary">Stok: {row.stok_barang}</Typography>
                                    <Box mt={2} display="flex" justifyContent="center" gap={1}>
                                        <Button variant="contained" color="primary" component={Link} to={`/buy/${row.id}`}>Buy</Button>
                                        <Button variant="contained" color="secondary" onClick={() => addToKeranjang(row.id)}><FaShoppingCart /></Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default Hero;
