import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/BaseUrl";

function DetailBuyer() {
    const {id} = useParams();
    const [buyer,setBuyer] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_DUMMY}/api/buyer/${id}`)
            .then((response) => setBuyer(response.data))
            .catch((error) => console.error("Error fetching data", data))
    },[id]);

    return(
        <div >
            <h1 >Detail Pembelian</h1>
            {buyer ? (
                <div >
                    <div>
                        <p>
                            Nama: <span>{buyer.nama}</span>
                        </p>
                        <p>
                            Alamat: <span>{buyer.alamat}</span>
                        </p>
                        <p>
                            Nama Barang: <span>{buyer.nama_barang}</span>
                        </p>
                        <p>
                            Jumlah: <span>{buyer.jumlah}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
                    Loading...
                </p>
            )}
            <a href="/riwayatBuyer">
                <button >
                    Kembali
                </button>
            </a>
        </div>
    );
}

export default DetailBuyer;