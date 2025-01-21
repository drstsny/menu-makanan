import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";

function Buy({ stok_barang }) {
    const { id } = useParams();
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [ nama_barang] = useState("");
    const [jumlah, setJumlah] = useState(1);
    const [makanan, setMakanan] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nama.trim()) {
            Swal.fire({
                icon: "error",
                title: "Nama tidak boleh kosong!",
                timer: 1500,
            });
            return;
        }

        if (!alamat.trim()) {
            Swal.fire({
                icon: "error",
                title: "Alamat tidak boleh kosong!",
                timer: 1500,
            });
            return;
        }

        if (isNaN(jumlah) || jumlah < 1) {
            Swal.fire({
                icon: "error",
                title: "Jumlah harus berupa angka dan minimal 1!",
                timer: 1500,
            });
            return;
        }

        if (jumlah > (makanan?.stok_barang || 0)) {
            Swal.fire({
                icon: "error",
                title: "Jumlah pembelian melebihi stok!",
                timer: 1500,
            });
            return;
        }

        try {
            await axios.post(`${API_DUMMY}/api/barang/${id}`, {nama_barang})
            await axios.post(`${API_DUMMY}/api/barang/api/barang/buy/${id}`, { jumlah});
            await axios.post(`${API_DUMMY}/api/buyer/buyer`, {
                nama: nama,
                nama_barang: nama_barang,
                jumlah : jumlah,
                alamat: alamat,
            });

            Swal.fire({
                icon: "success",
                title: "Pesanan berhasil dibuat.",
                timer: 1500,
            });
            setNama("");
            setAlamat("");
            setJumlah(1);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Terjadi kesalahan",
                text: error.response?.data?.message || error.message,
            });
        }
    };

    useEffect(() => {
        axios
            .get(`${API_DUMMY}/api/barang/${id}`)
            .then((response) => setMakanan(response.data))
            .catch((error) => console.log("Gagal memuat data:", error));
    }, [id]);

    return (
        <div>
            {makanan ? (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        marginTop: "20px",
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        maxWidth: "400px",
                        margin: "20px auto",
                        background: "#f9f9f9",
                    }}
                >
                    <h3 style={{ marginBottom: "20px" }}>Form Pembelian</h3>
                    <div style={{ marginBottom: "10px" }}>
                        <p><span>{makanan.nama_barang}</span></p>
                        <img src={makanan.link_gambar} alt="" style={{ maxWidth: "100%" }} />
                        <label htmlFor="nama" style={{ display: "block", marginBottom: "5px" }}>
                            Nama Pembeli:
                        </label>
                        <input
                            type="text"
                            id="nama"
                            name="nama"
                            placeholder="Masukkan nama Anda"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="jumlah" style={{ display: "block", marginBottom: "5px" }}>
                            Jumlah Barang:
                        </label>
                        <input
                            type="number"
                            id="jumlah"
                            name="jumlah"
                            value={jumlah}
                            onChange={(e) => setJumlah(Number(e.target.value))}
                            min="1"
                            max={stok_barang}
                            required
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="alamat" style={{ display: "block", marginBottom: "5px" }}>
                            Alamat Pengiriman:
                        </label>
                        <textarea
                            id="alamat"
                            name="alamat"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            placeholder="Masukkan alamat pengiriman Anda"
                            rows="4"
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: "10px 20px",
                            background: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Konfirmasi Pembelian
                    </button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Buy;
