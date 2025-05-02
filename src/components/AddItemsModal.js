import React, { useState, useEffect, useRef } from "react";
import "./AddItemsModal.css";

const AddItemModal = ({ isOpen, onClose, onSave, existingItem }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch("http://130.225.170.52:10331/api/tags/", {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setAvailableTags(data); // assuming data is an array of tag objects
      })
      .catch((err) => console.error("Failed to load tags:", err));
  }, []);

  // Populate form fields for edit
  useEffect(() => {
    if (existingItem) {
      setName(existingItem.name || "");
      setDescription(existingItem.description || "");
      setPrice(existingItem.price || "");
      setTags(existingItem.tags || []);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setTags([]);
    }
  }, [existingItem]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTagsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle tag select/deselect
  const handleTagChange = (tag) => {
    if (tags.some((t) => (t.id || t) === (tag.id || tag))) {
      setTags((prev) => prev.filter((t) => (t.id || t) !== (tag.id || tag)));
    } else {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleSave = () => {
    if (!name || !description || !price) {
      alert("All fields are required!");
      return;
    }
    onSave({
      name,
      description,
      price: parseFloat(price),
      tags: tags.map((tag) => tag.id || tag), // pass IDs only
    });
    onClose();
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
        <div className="tags-dropdown" ref={dropdownRef}>
          <div
            className="tags-dropdown-header"
            onClick={() => setTagsDropdownOpen(!tagsDropdownOpen)}
          >
            {tags.length > 0
              ? tags.map(tag => tag.tagvalue || tag.name || "").join(", ")
              : "Select tags..."}
          </div>

          {tagsDropdownOpen && (
            <div className="tags-dropdown-list">
              {availableTags.map((tag) => (
                <div key={tag.id || tag} className="tag-item">
                  <div className="tag-content">
                    <input
                      type="checkbox"
                      id={`tag-${tag.id || tag}`}
                      checked={tags.some((t) => (t.id || t) === (tag.id || tag))}
                      onChange={() => handleTagChange(tag)}
                    />
                    <label htmlFor={`tag-${tag.id}`}>{tag.tagvalue || tag.name || "Unnamed"}</label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
