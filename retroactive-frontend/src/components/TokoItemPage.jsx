import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function TokoItemPage() {
  const [getNamaAlbum, setNamaAlbum] = useState("");
  const [getNamaArtis, setNamaArtis] = useState("");
  const [getJenisMedia, setJenisMedia] = useState("");
  const [getHargaMedia, setHargaMedia] = useState(0.0);
  const [getGambarMedia, setGambarMedia] = useState("");
  const [getJumlah, setJumlah] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e, v) => {
    v(e.target.value);
  };

  const handleAddItem = () => {
    const namaToko = "Retroactive";
    console.log(namaToko);
    console.log(getNamaAlbum);
    axios
      .post("http://localhost:1466/shop/addItem", {
        namaToko: namaToko,
        namaAlbum: getNamaAlbum,
        namaArtis: getNamaArtis,
        jenisMedia: getJenisMedia,
        hargaMedia: getHargaMedia,
        jumlah: getJumlah,
        gambarMedia: getGambarMedia,
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        toast.success(`Berhasil menambahkan ${getNamaAlbum}, ${getNamaArtis}`);
        setTimeout(() => {
          navigate("/toko-home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div className="w-full max-w-sm mx-auto mt-10">
          <div className="bg-amber-950 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
            <div className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
              <h1 className="font-sans text-white flex text-4xl justify-center">
                RETROACTIVE
              </h1>
              <h1 className="font-sans text-white flex text-2xl font-bold mt-2 justify-center">
                Add Item
              </h1>
            </div>
            <label
              className="block font-sans text-gray-300 text-sm font-bold mb-2"
              htmlFor="namaUser"
            >
              Nama Album
            </label>
            <input
              className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => {
                handleChange(e, setNamaAlbum);
              }}
              placeholder="Nama Album"
            />
            <label
              className="block font-sans text-gray-300 text-sm font-bold mb-2"
              htmlFor="namaUser"
            >
              Nama Artis
            </label>
            <input
              className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => {
                handleChange(e, setNamaArtis);
              }}
              placeholder="Nama Artis"
            />
            <label
              className="block font-sans text-gray-300 text-sm font-bold mb-2"
              htmlFor="namaUser"
            >
              Jenis Media
            </label>
            <input
              className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => {
                handleChange(e, setJenisMedia);
              }}
              placeholder="Jenis Media"
            />
            <label
              className="block font-sans text-gray-300 text-sm font-bold mb-2"
              htmlFor="namaUser"
            >
              Harga Media
            </label>
            <input
              className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => {
                handleChange(e, setHargaMedia);
              }}
              placeholder="Harga Media"
            />
            <label
              className="block font-sans text-gray-300 text-sm font-bold mb-2"
              htmlFor="namaUser"
            >
              Jumlah
            </label>
            <input
              className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => {
                handleChange(e, setJumlah);
              }}
              placeholder="Jumlah"
            />
            <label
              className="block font-sans text-gray-300 text-sm font-bold mb-2"
              htmlFor="namaUser"
            >
              Gambar Media
            </label>
            <input
              className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => {
                handleChange(e, setGambarMedia);
              }}
              placeholder="Gambar Media"
            />
            <button
              className="bg-orange-900 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                handleAddItem();
              }}
            >
              Place
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default TokoItemPage;
