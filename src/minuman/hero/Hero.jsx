import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../utils/BaseUrl";

function Hero() {
    const [barang, setBarang] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);

    const getAll = () => {
        axios
            .get(`${API_DUMMY}/api/barang/minuman`)
            .then((res) => {
                setBarang(res.data);
                setError(null);
            })
            .catch(() => {
                setError("Terjadi kesalahan saat memuat data.");
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

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
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

            <div className="grid grid-cols-3 mb-4 gap-2">
                <a href="/">
                    <h1 className="h-10 p-1 text-center bg-blue-600 rounded-lg text-white text-lg font-medium hover:text-gray-300 transition-colors duration-300">
                        makanan
                    </h1>
                </a>
                <a href="/minuman">
                    <h1 className="h-10 p-1 text-center bg-blue-600 rounded-lg text-white text-lg font-medium hover:text-gray-300 transition-colors duration-300">
                        minuman
                    </h1>
                </a>
                <a href="/makananRingan">
                    <h1 className="h-10 p-1 text-center bg-blue-600 rounded-lg text-white text-lg font-medium hover:text-gray-300 transition-colors duration-300">
                        makanan ringan
                    </h1>
                </a>
            </div>

            {error && <p className="text-center text-red-500">{error}</p>}
            {barang.length === 0 ? (
                <p className="text-center text-gray-500">Tidak ada barang ditemukan.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {barang.map((row) => (
                        <div
                            key={row.id}
                            className="border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={row.link_gambar}
                                alt={row.nama_barang}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-800 truncate">
                                    {row.nama_barang}
                                </h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    Harga: <span className="font-medium">Rp {row.harga_barang}</span>
                                </p>
                                <p className="text-gray-600 text-sm mt-1">
                                    Stok: <span className="font-medium">{row.stok_barang}</span>
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <Link to={`/buy/${row.id}`}>
                                        <button
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            Buy
                                        </button>
                                    </Link>
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
