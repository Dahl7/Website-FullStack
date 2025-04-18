import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddItemsModal from "../../components/AddItemsModal";
import "./SectionItemsPage.css";

const SectionItemsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { section, menu, restaurant } = location.state || {};
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    if (!section) return;

    fetch(`http://130.225.170.52:10331/api/menuItems/section/${section.id}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load items.");
      });
  }, [section]);

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await fetch(`http://130.225.170.52:10331/api/menuItems/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete item.");
    }
  };

  const saveItem = async (item) => {
    const parsedPrice = parseFloat(item.price);
    if (isNaN(parsedPrice)) {
      alert("Please enter a valid price.");
      return;
    }

    const payload = {
      name: item.name,
      description: item.description,
      price: parsedPrice,
      type: item.type,
      sectionID: section.id,
    };

    try {
      if (item.id) {
        // EDIT
        const res = await fetch(`http://130.225.170.52:10331/api/menuItems/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setItems(items.map((i) => (i.id === item.id ? updated : i)));
      } else {
        // ADD
        const res = await fetch(`http://130.225.170.52:10331/api/menuItems/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const newItem = await res.json();
        setItems([...items, newItem]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save item.");
    }
  };

  return (
    <div className="section-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>
      <div className="section-container">
        <h1>{section?.name || "Items"}</h1>

        <div className="section-items">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="section-item-container">
                <div className="section-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p><strong>Price:</strong> {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : "N/A"}</p>
                  <p><strong>Type:</strong> {item.type}</p>
                </div>
                <div className="section-actions">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="remove-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No items in this section.</p>
          )}
        </div>

        <div className="button-container">
          <button className="add-btn" onClick={handleAdd}>➕ Add Item</button>
        </div>
      </div>

      <AddItemsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveItem}
        existingItem={editingItem}
      />
    </div>
  );
};

export default SectionItemsPage;
