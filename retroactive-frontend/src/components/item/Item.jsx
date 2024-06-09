import React from "react"; // Importing the React library
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom for navigation
import cart from "../../assets/cart.svg";
import axios from "axios";
import { toast } from "react-toastify";

// Defining the Item functional component
export const Item = ({
  id,
  nama_toko,
  nama_album,
  nama_artis,
  jenis_media,
  harga_media,
  jumlah,
  gambar_media,
}) => {
  return (
    // Link component for navigation to a specific item's page using id
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-out transform hover:scale-110 hover:shadow-2xl">
      {/* Image section with updated source and alt attributes */}
      <img
        src={gambar_media}
        alt={`${nama_album} cover`}
        className="w-full h-64 object-contain"
      />
      <div className="p-4">
        {/* Store name */}
        <h3 className="text-xl font-semibold text-gray-900">{nama_toko}</h3>
        {/* Album name */}
        <h4 className="text-lg text-gray-700">{nama_album}</h4>
        {/* Artist name */}
        <p className="text-md text-gray-600">{nama_artis}</p>
        {/* Media type */}
        <p className="text-sm text-gray-500">{jenis_media}</p>
        {/* Price and quantity section */}
        <div className="flex justify-between items-center mt-2">
          {/* Displaying the price in bold and red */}
          <p className="text-lg text-red-600 font-bold">${harga_media}</p>
          {/* Displaying the quantity */}
          <p className="text-sm text-gray-500">Qty: {jumlah}</p>
          <button
            className="text-xs text-white bg-orange-900"
            onClick={() => {
              const namaUser = localStorage.getItem(
                "StaticUtils_loggedNamaUser"
              );
              axios
                .post("http://localhost:1466/shop/addToCart", {
                  namaUser: namaUser,
                  namaAlbum: nama_album,
                })
                .then((res) => {
                  const response = res.data;
                  console.log(response);
                  toast.success("Successfully added to cart.")
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
