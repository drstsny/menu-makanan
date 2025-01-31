import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../utils/BaseUrl";
import Logo from "../../assets/Logo.png";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import Swal from "sweetalert2";

function Hero() {
    const [barang, setBarang] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const getAll = () => {
        axios
            .get(`${API_DUMMY}/api/barang/makanan`)
            .then((res) => {
                setBarang(res.data);
            })
            .catch((error) => {
                alert("Terjadi kesalahan: " + error);
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
            Swal.fire({
                icon: "success",
                title: "Berhasil Menambahkan Ke Keranjang",
                timer: 1500
            });
        } catch (error) {
            alert("Gagal Menambahkan Ke Keranjang", error);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="w-full bg-gray-200">
            <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md py-4 sticky top-0">
                <div className="container mx-auto flex items-center justify-between px-6">
                    <div className="flex items-center space-x-4">
                        <img src={Logo} alt="Logo" 
                        className="w-14 h-14 bg-white p-2 rounded-full border border-gray-300 shadow-sm" />
                        <h1 className="text-white text-2xl md:text-3xl font-bold"
                            >Warung Makan
                        </h1>
                    </div>
                    <div className="hidden md:flex flex-1 mx-4">
                        <form onSubmit={handleSearch} 
                            className="flex items-center w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                            <input 
                                type="text" 
                                placeholder="Cari makanan favoritmu..." 
                                value={search} onChange={(e) => setSearch(e.target.value)} 
                                className="w-full px-4 py-2 text-gray-700 focus:outline-none" />
                            <button 
                                type="submit" 
                                className="bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition duration-300">
                                <FaSearch />
                            </button>
                        </form>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/keranjang" className="text-white text-lg font-medium flex items-center space-x-2 hover:text-gray-300 transition duration-300">
                            <FaShoppingCart className="text-xl" />
                            <h1 className="hidden md:block ">
                                Keranjang
                            </h1>
                        </Link>
                        <Link to="/login" className="text-white text-lg font-medium flex items-center space-x-2 hover:text-gray-300 transition duration-300">
                            <FaUser className="text-xl" />
                            <h1 className="hidden md:block">
                                Admin ?
                            </h1>
                        </Link>
                    </div>
                    <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaBars />
                    </button>
                </div>
            </nav>
            {/* Dropdown Menu for Mobile */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md py-2">
                    <Link to="/"
                        className="block py-2 px-4 text-center text-gray-800 hover:bg-blue-500 hover:text-white"
                        >Makanan
                    </Link>
                    <Link to="/minuman" 
                        className="block py-2 px-4 text-center text-gray-800 hover:bg-blue-500 hover:text-white"
                        >Minuman
                    </Link>
                    <Link to="/makananRingan" 
                        className="block py-2 px-4 text-center text-gray-800 hover:bg-blue-500 hover:text-white" 
                        >Makanan Ringan
                    </Link>
                </div>
            )}
            
            {/* Kategori Desktop */}
            <div className="hidden md:grid grid-cols-3 justify-center space-x-1  py-2 text-center ">
                <Link to="/" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >Makanan</Link>
                <Link to="/minuman" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >Minuman</Link>
                <Link to="/makananRingan" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >Makanan Ringan</Link>
            </div>
            

            {error && <p className="text-center text-red-500">{error}</p>}
            {barang.length === 0 ? (
                <p className="text-center text-gray-500">Tidak ada barang ditemukan.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    {barang.map((row) => (
                        <div key={row.id} 
                            className="border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
                            <img src={row.link_gambar} alt={row.nama_barang} 
                                className="w-full h-64 object-cover" />
                            <div className="p-4 text-center">
                                <h3 className="font-bold text-lg text-gray-800">{row.nama_barang}</h3>
                                <p className="text-gray-600 mt-2">Harga:
                                    <span className="font-medium">
                                    Rp{row.harga_barang}</span>
                                </p>
                                <p className="text-gray-600 mt-1">Stok: 
                                    <span className="font-medium">
                                        {row.stok_barang}</span>
                                </p>
                                <div className="mt-4 flex justify-center gap-2">
                                    <Link to={`/buy/${row.id}`} 
                                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                        >Buy
                                    </Link>
                                    <button onClick={() => addToKeranjang(row.id)} 
                                        className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700">
                                        <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Hero;
