import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import Swal from "sweetalert2";
import Logo from "../assets/Logo.png";
import { Grid, TextField, Button, Typography, Box, Paper } from "@mui/material";


const Register = () => {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('');
        return() => {
            document.body.classList.add('');
        };
    }, []);
    
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post (`${API_DUMMY}/api/user/register`, {
                email: email,
                password: password,
                nama: nama,   
            });
            Swal.fire({
                icon: "success",
                title: "Berhasil Register!",
                showConfirmButton: false,
                timer: 1500,
            }); 

            setTimeout(() => {
                navigate("/login");
            }, 1500);

            } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Register Gagal",
                text: "Periksa kembali email dan password Anda",
            });
            console.log(error);
            }
        };

    return(
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
            <Grid item xs={12} sm={8} md={4}>
                <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <img src={Logo} alt="Logo" style={{ width: "80px" }} />
                    </Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleRegister}>
                        <TextField
                            fullWidth
                            label="name"
                            variant="outlined"
                            margin="normal"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                            >

                        </TextField>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                        >
                            Register
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Sudah punya akun? <a href="/login" style={{ color: "#1976d2", textDecoration: "none" }}>Login</a>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;