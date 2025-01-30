import axios from "axios";
import { useEffect, useState } from "react";
import { API_DUMMY } from "../utils/BaseUrl";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import Logo from "../assets/Keranjang.png"

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
            .delete(`${API_DUMMY}/api/keranjang/api/keranjang/${id}`)
            .then(() => {
                setKeranjang(keranjang.filter(item => item.id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Barang Berhasil Di Hapus",
                    timer: 1500
                })
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal Menghapus Barang",
                    timer: 1500
                })
            });
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100">
            <nav className="flex sticky top-0 justify-between py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
                <div className="flex items-center ">
                    <img   
                        src={Logo} 
                        alt="Logo"
                        className="w-32 "
                        />
                    <h1 className="text-center text-3xl font-bold text-white ">
                        Keranjang Belanja
                    </h1>
                </div>
                <div className="flex mb-2">
                    <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <input
                            type="text"
                            placeholder="Cari barang di keranjang..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2">
                            <FaSearch />
                                Cari
                        </button>
                    </form>
                </div>
            </nav>

            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            {keranjang.length === 0 ? (
                <p className="text-center text-gray-500 mt-6">Tidak ada barang ditemukan.</p>
            ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {keranjang.map((row) => (
                        <div key={row.id} className="border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                            <img src={row.link_gambar} alt={row.nama_barang} className="w-full h-56 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-800 truncate">{row.nama_barang}</h3>
                                <p className="text-gray-600 text-sm mt-2">Jumlah: <span className="font-medium">{row.jumlah}</span></p>
                                <p className="text-gray-600 text-sm mt-1">Harga: <span className="font-medium">Rp {row.harga_barang}</span></p>
                                <div className="mt-4 flex justify-center gap-2">
                                    <Link to={`/buy/${row.id}`}>
                                        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                                            Beli
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                                        onClick={() => deleteBarang(row.id)}>
                                            hapus
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

export default Keranjang;
