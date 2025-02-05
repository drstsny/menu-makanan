import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";

function DetailBuyer() {
    const { id } = useParams();
    const [buyer, setBuyer] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_DUMMY}/api/buyer/${id}`)
            .then((response) => setBuyer(response.data))
            .catch((error) => console.error("Error fetching data", error));
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            <h1 className="text-center text-3xl font-bold text-gray-700 mb-6 border-b-2 pb-2">
                Detail Pembelian
            </h1>

            {buyer ? (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg">
                    <div className="flex flex-col gap-3 text-lg text-gray-800">
                        <p className="font-semibold">
                            Nama: <span className="font-normal">{buyer.nama}</span>
                        </p>
                        <p className="font-semibold">
                            Alamat: <span className="font-normal">{buyer.alamat}</span>
                        </p>
                        <p className="font-semibold">
                            Nama Barang: <span className="font-normal">{buyer.nama_barang}</span>
                        </p>
                        <p className="font-semibold">
                            Jumlah: <span className="font-normal">{buyer.jumlah}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500">Loading...</p>
            )}

            <div className="flex justify-center mt-6">
                <a
                    href="/riwayatBuyer"
                    className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md 
                    hover:bg-blue-600 transition-all duration-300"
                >
                    Kembali
                </a>
            </div>
        </div>
    );
}

export default DetailBuyer;
