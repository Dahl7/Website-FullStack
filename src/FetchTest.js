import { useEffect, useState } from "react";

function FetchTest() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🚀 useEffect is running...");

    fetch('http://130.225.170.52:10331/users', {
      method: 'GET',
    })
      .then(response => {
        console.log("✅ Response received:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("📦 Fetched data:", data);
        setUsers(data);
      })
      .catch(err => {
        console.error("❌ Fetch error:", err);
        setError(err.message);
      });

  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default FetchTest;
