import React, { useState } from "react"; // Importing React and the useState hook
import { toast } from "react-toastify"; // Importing toast for notifications

function CreateItemForm() {
  // State to manage form data
  const [formData, setFormData] = useState({
    nama_toko: "",
    nama_album: "",
    nama_artis: "",
    jenis_media: "",
    harga_media: "",
    jumlah: "",
    gambar_media: "",
  });

  // Handler to update form data state on input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler to manage form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Sending POST request to the server
      const response = await fetch("http://localhost:1466/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending form data in JSON format
      });

      // Handling response
      if (response.ok) {
        toast.success("Item successfully added to the shop."); // Success notification
        setFormData({
          nama_toko: "",
          nama_album: "",
          nama_artis: "",
          jenis_media: "",
          harga_media: "",
          jumlah: "",
          gambar_media: "",
        }); // Resetting form data
      } else {
        toast.error("Failed to add the item."); // Error notification
      }
    } catch (error) {
      toast.error(`Error occurred while adding the item: ${error.message}`); // Error notification with message
    }
  };

  // Rendering the form
  return (
    <div className="text-black max-w-xl mx-auto my-10 p-5 border rounded-lg bg-gray-100">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4">Add New Shop Item</h2>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium mb-1">
            Store Name:
          </label>
          <input
            type="text"
            name="nama_toko"
            value={formData.nama_toko}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium mb-1">
            Album Name:
          </label>
          <input
            type="text"
            name="nama_album"
            value={formData.nama_album}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium mb-1">
            Artist Name:
          </label>
          <input
            type="text"
            name="nama_artis"
            value={formData.nama_artis}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium mb-1">
            Media Type:
          </label>
          <input
            type="text"
            name="jenis_media"
            value={formData.jenis_media}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium mb-1">
            Price:
          </label>
          <input
            type="number"
            name="harga_media"
            value={formData.harga_media}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium mb-1">
            Quantity:
          </label>
          <input
            type="number"
            name="jumlah"
            value={formData.jumlah}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium mb-1">
            Item Image URL:
          </label>
          <input
            type="text"
            name="gambar_media"
            value={formData.gambar_media}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateItemForm; // Exporting the CreateItemForm component
