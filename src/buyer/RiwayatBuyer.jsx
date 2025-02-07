import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../utils/BaseUrl";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Box } from "@mui/material";

function RiwayatBuyer() {
    const [buyer, setBuyer] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        axios.get(`${API_DUMMY}/api/buyer`)
            .then((res) => setBuyer(res.data))
            .catch((error) => alert("Terjadi kesalahan: " + error));
    }, []);

    return (
        <Box>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenuOpen(true)}>
                        <FaBars />
                    </IconButton>
                    <Box display="flex" alignItems="center" flexGrow={1}>
                        <img src={Logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
                        <Typography variant="h6" fontWeight="bold">Dashboard Admin</Typography>
                    </Box>
                    {/* <Button color="inherit" component={Link} to="/add">Tambah Barang</Button>
                    <Button color="inherit" component={Link} to="/">Menu Barang</Button>
                    <Button color="inherit" component={Link} to="/riwayatBuyer">Riwayat Pembeli</Button> */}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
                <List>
                    <ListItem button component={Link} to="/add" onClick={() => setMenuOpen(false)} sx={{ '&:hover': { backgroundColor: '#1976D2', color: 'white' } }} >
                        <ListItemText primary="Tambah Barang" />
                    </ListItem>
                    <ListItem button component={Link} to="/" onClick={() => setMenuOpen(false)} sx={{ '&:hover': { backgroundColor: '#1976D2', color: 'white' } }}>
                        <ListItemText primary="Menu Barang" />
                    </ListItem>
                    <ListItem button component={Link} to="/riwayatBuyer" onClick={() => setMenuOpen(false)} sx={{ '&:hover': { backgroundColor: '#1976D2', color: 'white' } }}>
                        <ListItemText primary="Riwayat Pembelian" />
                    </ListItem>
                    <ListItem button component={Link} to="/data">
                        <ListItemText primary="Data Barang"/>
                    </ListItem>
                </List>
            </Drawer>

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                    Riwayat Pembelian
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                            <TableRow>
                                <TableCell align="center"><strong>No</strong></TableCell>
                                <TableCell><strong>Nama</strong></TableCell>
                                <TableCell><strong>Nama Barang</strong></TableCell>
                                <TableCell><strong>Jumlah</strong></TableCell>
                                <TableCell align="center"><strong>Aksi</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buyer.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell>{row.nama}</TableCell>
                                    <TableCell>{row.nama_barang}</TableCell>
                                    <TableCell>{row.jumlah}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="info" component={Link} to={`/detailBuyer/${row.id}`} sx={{ textTransform: "none" }}>
                                            Detail
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
}

export default RiwayatBuyer;
