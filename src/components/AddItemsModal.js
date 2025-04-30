import React, { useState, useEffect, useRef } from "react";
import "./AddItemsModal.css";

const availableTags = ["Lactose-Free", "Vegan", "Gluten-Free", "Spicy", "Nut-Free"];

const AddItemModal = ({ isOpen, onClose, onSave, existingItem }) => {
  const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

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

      const handleTagChange = (tag) => {
        if (tags.includes(tag)) {
          setTags((prevTags) => prevTags.filter((t) => t !== tag));
        } else {
          setTags((prevTags) => [...prevTags, tag]);
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
      tags: tags,
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
                      {tags.filter(Boolean).length > 0 ? tags.filter(Boolean).join(", ") : "Select tags..."}
                    </div>

                    {tagsDropdownOpen && (
                      <div className="tags-dropdown-list">
                        {availableTags.map((tag) => (
                          <div key={tag} className="tag-item">
                            <input
                              type="checkbox"
                              id={`tag-${tag}`}
                              value={tag}
                              checked={tags.includes(tag)}
                              onChange={() => handleTagChange(tag)}
                            />
                            <label htmlFor={`tag-${tag}`}>{tag}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

          <div className="modal-buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  export default AddItemModal;
