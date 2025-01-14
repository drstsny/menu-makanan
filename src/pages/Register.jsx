import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";
import Swal from "sweetalert2";
import Logo from "../assets/Logo.png";


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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <img src={Logo} alt="Logo" className="w-20 mx-32" />
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-cyan-300 focus:outline-none text-gray-700"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-cyan-300 focus:outline-none text-gray-700"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-cyan-300 focus:outline-none text-gray-700"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        />
                </div>
                <div>
                    <button
                        className="w-full bg-gray-500 hover:bg-gray-700 rounded-lg font-semibold py-2 px-4 transition duration-300"
                        type="submit"
                        >
                            Register
                    </button>
                </div>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
            </p>
            </div>
        </div>
    );
};

export default Register;