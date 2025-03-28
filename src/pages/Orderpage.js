import React, { useEffect, useState } from "react";
import "./Orderpage.css"; 

const Orderpage = () => {
  const [tableOrders, setTableOrders] = useState([]);

  useEffect(() => {
    const fakeData = [
      {
        table: "Table 1",
        orders: [
          "2 pancakes, 5 spaghetti, 1 burger",
          "1 burger,1 fries",
        ],
      },
      {
        table: "Table 2",
        orders: [
          "1 pizza",
        ],
      },
      {
        table: "Table 3",
        orders: [
          "2 steaks, 1 salad",
          "3 tacos",
        ],
      },
    ];
    setTableOrders(fakeData);
  }, []);

  const handleCheck = (tableIndex, orderIndex) => {
    setTableOrders(prevOrders => {
      const updatedOrders = [...prevOrders];
      const updatedTable = { 
        ...updatedOrders[tableIndex], 
        orders: updatedOrders[tableIndex].orders.filter((_, i) => i !== orderIndex) 
      };

      // Replace the table with updated orders
      updatedOrders[tableIndex] = updatedTable;

      // Filter out tables with no orders
      return updatedOrders.filter(table => table.orders.length > 0);
    });
  };

  return (
    <div className="menu-page">
      <div className="menu-container">
        <div className="tables-wrapper">
          {tableOrders
            .filter(table => table.orders.length > 0)
            .map((table, tableIndex) => (
              <div key={tableIndex} className="table-box">
                <h2>{table.table}</h2>
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
