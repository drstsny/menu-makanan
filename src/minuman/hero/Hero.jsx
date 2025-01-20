import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../utils/BaseUrl";

function Hero() {
    const [barang, setBarang] = useState([]);

    const getAll = () => {
        axios
            .get(`${API_DUMMY}/api/barang/minuman`)
            .then((res) => {
                setBarang(res.data);
            })
            .catch((error) => {
                alert("Terjadi kesalahan: " + error);
            });
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
        }}>
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    marginBottom: "20px",
                    fontWeight: "700",
                }}
            >
                Pilih Menu Di bawah Ini
            </h1>

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {barang.map((row) => (
                    <div
                        key={row.id}
                        className="border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={row.link_gambar}
                            alt={row.nama_barang}
                            className="w-full h-40 object-cover"
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
        </div>
    );
}

export default Hero;
