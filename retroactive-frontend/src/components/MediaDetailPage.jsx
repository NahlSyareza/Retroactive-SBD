import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function MediaDetailPage() {
  const { id } = useParams();
  const [getGambarMedia, setGambarMedia] = useState("");
  const [getNamaAlbum, setNamaAlbum] = useState("");
  const [getNamaArtis, setNamaArtis] = useState("");
  const [getJumlah, setJumlah] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:1466/shop/${id}`)
      .then((res) => {
        const response = res.data;
        if (response.state) {
          toast.success(response.message);
          setGambarMedia(response.payload.gambar_media);
          setNamaAlbum(response.payload.nama_album);
          setNamaArtis(response.payload.nama_artis);
          setJumlah(response.payload.jumlah);
        } else {
        }
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="mx-auto max-w-xl bg-amber-800 flex rounded-2xl p-4">
        <img src={getGambarMedia} />
        <div className="ml-3 bg-amber-700 p-3 rounded-2xl text-left">
          <p className="font-bold">{getNamaAlbum}</p>
          <p className="font-semibold mt-2">{getNamaArtis}</p>
          <p className="mt-2">Jumlah</p>
          <div className="mt-2 flex items-center justify-start">
            <button className="bg-green-500 m-1 scale-75">+</button>
            <p>{getJumlah}</p>
            <button className="bg-red-500 m-1 scale-75">-</button>
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

export default MediaDetailPage;
