import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import Swal from "sweetalert2";
import Logo from "../assets/Logo.png";
import { Grid, TextField, Button, Typography, Box, Paper } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('');
        return () => {
            document.body.classList.add('');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_DUMMY}/api/user/login`, {
                email: email,
                password: password,
            });
    
            const token = response.data.token; 
            sessionStorage.setItem("token", token); 
    
            Swal.fire({ icon: "success", 
                        title: "Berhasil Login!", 
                        timer: 1500 });
    
            setTimeout(() => {
                navigate("/data");
            }, 1500);
        } catch (error) {
            Swal.fire({ icon: "error", 
                        title: "Login Gagal", 
                        text: "Periksa kembali email dan password Anda" });
        }
    };
    

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
            <Grid item xs={12} sm={8} md={4}>
                <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <img src={Logo} alt="Logo" style={{ width: "80px" }} />
                    </Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
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
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Belum punya akun? <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>Register</a>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
