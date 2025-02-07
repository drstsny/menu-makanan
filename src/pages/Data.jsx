import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/BaseUrl";
import Logo from "../assets/Logo.png";

function Data() {
    const [barang, setBarang] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    const getAll = () => {
        axios
            .get(`${API_DUMMY}/api/barang`)
            .then((res) => {
                setBarang(res.data);
            })
            .catch((error) => {
                alert("Terjadi kesalahan: " + error);
            });
    };

    const deleteBarang = async (id) => {
        Swal.fire({
            title: "Apakah Ingin Dihapus?",
            text: "Data kamu tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${API_DUMMY}/api/barang/api/barang/${id}`)
                    .then(() => {
                        setBarang(barang.filter((item) => item.id !== id));
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil menghapus Data",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal menghapus Barang",
                            timer: 1500,
                        });
                    });
            }
        });
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenuOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <img src={Logo} alt="Logo" style={{ width: 50, marginRight: 10,}} />
                    <Typography variant="h6">Dashboard Admin</Typography>
                </Toolbar>
            </AppBar>
            
            <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
                <List>
                    <ListItem button component={Link} to="/add"  sx={{ '&:hover': { backgroundColor: '#1976D2', color: 'white' } }}>
                        <ListItemText primary="Tambah Barang" />
                    </ListItem>
                    <ListItem button component={Link} to="/"  sx={{ '&:hover': { backgroundColor: '#1976D2', color: 'white' } }}>
                        <ListItemText primary="Menu Barang" />
                    </ListItem>
                    <ListItem button component={Link} to="/riwayatBuyer"  sx={{ '&:hover': { backgroundColor: '#1976D2', color: 'white' } }}>
                        <ListItemText primary="Riwayat Pembeli" />
                    </ListItem>
                    <ListItem button component={Link} to="/data"  sx={{ '&:hover': { backgroundColor: '#1976D2', color: 'white' } }}>
                        <ListItemText primary="Data Barang"/>
                    </ListItem>
                </List>
            </Drawer>
            
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell>Nama</TableCell>
                            <TableCell>Harga</TableCell>
                            <TableCell>Stok</TableCell>
                            <TableCell align="center">Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {barang.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell>{row.nama_barang}</TableCell>
                                <TableCell>{row.harga_barang}</TableCell>
                                <TableCell>{row.stok_barang}</TableCell>
                                <TableCell align="center">
                                    <Button 
                                        variant="contained" 
                                        color="warning" 
                                        component={Link} to={`/edit/${row.id}`} 
                                        style={{ margin: 5 ,padding: 5}}>
                                            Edit
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="error" 
                                        onClick={() => deleteBarang(row.id)} 
                                        style={{ margin: 5 ,padding: 5}}>
                                            Hapus
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        component={Link} to={`/detail/${row.id}`}
                                        style={{ margin: 5,padding: 5}}>                                       
                                            Detail
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Data;