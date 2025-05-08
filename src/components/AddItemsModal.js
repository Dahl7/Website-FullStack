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
    fetch("${BASE_URL}/api/tags/", {
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) =>
        setAvailableTags(data.filter((tag) => tag?.tagvalue || tag?.name))
      )
      .catch((err) => console.error("Failed to load tags:", err));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (existingItem) {
      setName(existingItem.name || "");
      setDescription(existingItem.description || "");
      setPrice(existingItem.price || "");
      setTags(
        (existingItem.tags || []).filter((tag) => tag?.tagvalue || tag?.name)
      );
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setTags([]);
    }
  }, [isOpen, existingItem]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTagsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = () => {
    if (!name || !description || !price) {
      alert("All fields are required!");
      return;
    }

    onSave({
      id: existingItem?.id,
      name,
      description,
      price: parseFloat(price),
      type: "food", // ✅ hardcoded since type input is removed
      tags: tags.map((tag) => tag?.id || tag),
    });

    onClose();
  };

  return !isOpen ? null : (
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
              ? tags
                  .filter((tag) => tag?.tagvalue || tag?.name)
                  .map((tag) => tag.tagvalue || tag.name)
                  .join(", ")
              : "Select tags..."}
          </div>

          {tagsDropdownOpen && (
            <div className="tags-dropdown-list">
              {availableTags.map((tag) => {
                const tagId = tag?.id || tag;
                const isSelected = tags.some(
                  (t) => (t?.id || t) === tagId
                );

                const handleTagToggle = () => {
                  const newTags = isSelected
                    ? tags.filter((t) => (t?.id || t) !== tagId)
                    : [...tags, tag];
                  setTags(newTags);
                  setTagsDropdownOpen(false); // ✅ close after selection
                };

                return (
                  <div key={tagId} className="tag-item">
                    <div className="tag-content">
                      <input
                        type="checkbox"
                        id={`tag-${tagId}`}
                        checked={isSelected}
                        onChange={handleTagToggle}
                      />
                      <label htmlFor={`tag-${tagId}`}>
                        {tag.tagvalue || tag.name}
                      </label>
                    </div>
                  </div>
                );
              })}
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
