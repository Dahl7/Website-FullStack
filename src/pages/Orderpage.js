import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orderpage.css"; 

const Orderpage = () => {
  const [tableOrders, setTableOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const restaurantId = localStorage.getItem("restaurantId");
      const accessToken = "NQaPlVIJpGgu0s2cf7liG9VPXgPbT4OcJBZzXBS4lxw";
      if (!restaurantId || !accessToken) {
        console.error("Missing restaurantId or accessToken");
        return;
      }

      try {
        const response = await fetch(`http://130.225.170.52:10331/api/orders/byrestaurant/${restaurantId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const orders = await response.json();
        console.log("Fetched orders from API:", orders); 

        const grouped = {};
        orders.forEach(order => {
          const tableId = `Table ${order.tableid}`;
          if (!grouped[tableId]) {
            grouped[tableId] = [];
          }
        
          const itemNames = order.menuitems.map(item => item.name).join(", ");
          grouped[tableId].push(itemNames);  // 👈 show names instead of order ID
        });
        
        

        const formatted = Object.entries(grouped).map(([table, orders]) => ({
          table,
          orders
        }));
        setTableOrders(formatted);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setTableOrders([]);
      }
    };

  fetchOrders();

  const intervalId = setInterval(fetchOrders, 2000);

  return () => clearInterval(intervalId);  }, []);

  const handleCheck = async (tableIndex, orderIndex) => {
    const orderText = tableOrders[tableIndex].orders[orderIndex];
    const match = orderText.match(/Order #(\d+)/);
    const orderId = match ? match[1] : null;

    if (!orderId) {
      console.error("Order ID not found in text:", orderText);
      return;
    }

    const accessToken = "ldwXGJ35AVsY_2nbTLGufvNlB44yFwNf4FQDF18bokI";

    try {
      const response = await fetch(`http://130.225.170.52:10331/api/orders/markComplete/${orderId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer NQaPlVIJpGgu0s2cf7liG9VPXgPbT4OcJBZzXBS4lxw`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to mark order ${orderId} as complete. Status: ${response.status}`);
      }

      // Update UI only if API call was successful
      setTableOrders(prevOrders => {
        const updatedOrders = [...prevOrders];
        const updatedTable = { 
          ...updatedOrders[tableIndex], 
          orders: updatedOrders[tableIndex].orders.filter((_, i) => i !== orderIndex) 
        };

        updatedOrders[tableIndex] = updatedTable;
        return updatedOrders.filter(table => table.orders.length > 0);
      });

    } catch (error) {
      console.error("Error marking order as complete:", error);
    }
  };

  return (
    <div className="order-page">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={() => navigate(-1)}>
        &#8592;
      </div>
  
      {tableOrders.map((table, tableIndex) =>
        table.orders.map((order, orderIndex) => (
          <div key={`${tableIndex}-${orderIndex}`} className="order-box">
            <span className="order-text">{order}</span>
            <button
              className="check-btn"
              onClick={() => handleCheck(tableIndex, orderIndex)}
            >
              ✓
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Orderpage;
