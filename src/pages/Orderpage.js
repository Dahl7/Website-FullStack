import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orderpage.css"; 

const Orderpage = () => {
  const [tableOrders, setTableOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const restaurantId = localStorage.getItem("restaurantId");
      const accessToken = localStorage.getItem("accessToken");
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
          const tableId = `Table ${order.orderTable}`;
          if (!grouped[tableId]) {
            grouped[tableId] = [];
          }
          grouped[tableId].push(`Order #${order.orderId}`);
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
  }, []);

  const handleCheck = async (tableIndex, orderIndex) => {
    const orderText = tableOrders[tableIndex].orders[orderIndex];
    const match = orderText.match(/Order #(\d+)/);
    const orderId = match ? match[1] : null;

    if (!orderId) {
      console.error("Order ID not found in text:", orderText);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`http://130.225.170.52:10331/api/orders/markComplete/${orderId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
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
      <div className="menu-container">
        <div className="tables-wrapper">
          {tableOrders
            .filter(table => table.orders && table.orders.length > 0)
            .map((table, tableIndex) => (
              <div key={tableIndex} className="table-box">
                <h2>{table.table || `Table ${tableIndex + 1}`}</h2>
                <div className="order-items">
                  {table.orders.map((order, orderIndex) => (
                    <div key={orderIndex} className="order-box">
                      <span className="order-text">{order}</span>
                      <button 
                        className="check-btn" 
                        onClick={() => handleCheck(tableIndex, orderIndex)}
                      >
                        ✓
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Orderpage;
