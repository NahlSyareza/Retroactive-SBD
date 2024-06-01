import React from "react"; // Importing the React library
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom for navigation

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
    <Link
      to={`/${id}`}
      className="bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-out transform hover:scale-110 hover:shadow-2xl"
    >
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
        </div>
      </div>
    </Link>
  );
};