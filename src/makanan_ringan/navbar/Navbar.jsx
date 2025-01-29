import Logo from "../../assets/Logo.png";
import React, { useState } from "react";


const Navbar = () => {
    const [barang ,setBarang] = useState([]);
    const [search, setSearch] = useState("");
    const [error,setError] = useState(null);
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
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
            <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-16 h-16 bg-white p-2 rounded-full border border-gray-300 shadow-sm"
                    />
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                        Selamat Datang
                    </h1>
                </div>
                <div>
                <form
            onSubmit={handleSearch} 
            className="flex items-center justify-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white"
            >
                <input 
                type="text"
                placeholder="Masukkan Nama Barang"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                type="submit" 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Cari
                </button>
            </form>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a
                        href="/login"
                        className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-300"
                    >
                        Admin ?
                    </a>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
