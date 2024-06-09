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

  const handleAddJumlah = () => {
    axios
      .put("http://localhost:1466/shop/addInventoryJumlah", {
        namaAlbum: getNamaAlbum,
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.state) {
          setJumlah(getJumlah + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubJumlah = () => {
    axios
      .put("http://localhost:1466/shop/subInventoryJumlah", {
        namaAlbum: getNamaAlbum,
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.state) {
          setJumlah(getJumlah - 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div className="max-w-sm mx-auto">
        <img src={getGambarMedia} />
      </div>
      <div className="flex mx-auto justify-start max-w-sm bg-orange-900 rounded-br-2xl rounded-bl-2xl">
        <div className="p-3 rounded-tr-2xl rounded-br-2xl text-left min-w-sm">
          <p className="font-bold">{getNamaAlbum}</p>
          <p className="font-semibold mt-2">{getNamaArtis}</p>
          <p className="mt-2">Jumlah</p>
          <div className="mt-2 flex items-center justify-start">
            <p
              className="bg-green-500 m-1 p-2 rounded-md"
              onClick={handleAddJumlah}
            >
              +
            </p>
            <p>{getJumlah}</p>
            <p
              className="bg-red-500 m-1 p-2 rounded-md"
              onClick={handleSubJumlah}
            >
              -
            </p>
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
