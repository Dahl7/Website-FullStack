import React, { useState, useEffect } from "react";
import "./AddItemsModal.css";

const AddItemModal = ({ isOpen, onClose, onSave, existingItem }) => {
  const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
      if (existingItem) {
        setName(existingItem.name || "");
        setDescription(existingItem.description || "");
        setPrice(existingItem.price || "");
        setTags(existingItem.tags ? existingItem.tags.join(", ") : "");
      } else {
        setName("");
        setDescription("");
        setPrice("");
        setTags("");
      }
    }, [existingItem]);

  const handleSave = () => {
    if (!name || !description || !price) {
      alert("All fields are required!");
      return;
    }
    onSave({
      name,
      description,
      price: parseFloat(price),
      tags: tags.split(",").map((tag) => tag.trim()),
    });

    onClose();
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;

    try {
      const token = localStorage.getItem("jwt_token"); // Replace with your actual JWT token logic
      const res = await fetch("http://130.225.170.52:10331/api/SASURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ fileName: imageFile.name }),
      });

      const { sasUrl } = await res.json();

      const uploadRes = await fetch(sasUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": imageFile.type,
        },
        body: imageFile,
      });

      if (uploadRes.ok) {
        setImageUrl(sasUrl.split('?')[0]);
        alert("✅ Image uploaded successfully!");
      } else {
        alert("❌ Image upload failed.");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("❌ Upload error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
      <div className="modal-overlay">
        <div className="modal-container">
          <h2>{existingItem ? "Edit Item" : "Add New Item"}</h2>

          <label>Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description"
          />

          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />

          <label>Tags</label>
          <input
            type="text"
            placeholder="Comma-separated (e.g., Lactose, Vegan)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button onClick={handleUploadImage} disabled={!imageFile}>
            Upload Image
          </button>
          {imageUrl && <p className="image-preview">✅ Image ready to use</p>}

          <div className="modal-buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  export default AddItemModal;
