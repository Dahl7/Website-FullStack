// RestaurantEditor.js
import React, { useState, useEffect } from "react";

const RestaurantEditor = ({ restaurant, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...restaurant });

  useEffect(() => {
    setForm({ ...restaurant });
    setIsEditing(false);
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
    setIsEditing(false);
  };

  return (
    <div className="restaurant-editor">
      <h3>Edit Restaurant</h3>
      <label>Name:</label>
      <input name="name" value={form.name} onChange={handleChange} readOnly={!isEditing} />

      <label>Description:</label>
      <textarea name="description" value={form.description} onChange={handleChange} readOnly={!isEditing} />

      <label>Opening Time:</label>
      <input name="openingTime" value={form.openingTime} onChange={handleChange} readOnly={!isEditing} />

      <label>Closing Time:</label>
      <input name="closingTime" value={form.closingTime} onChange={handleChange} readOnly={!isEditing} />

      <label>Stripe Key:</label>
      <input name="stripeKey" value={form.stripeKey} onChange={handleChange} readOnly={!isEditing} />

      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
};

export default RestaurantEditor;
