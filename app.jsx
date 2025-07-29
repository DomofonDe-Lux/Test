import React, { useState, useEffect } from 'react';

// Simple component that loads user data once and reuses it.
// This prevents fetching users on every request.
const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user list once when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // empty dependency array ensures this runs once

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cards">
      {users.map(user => (
        <div key={user.id} className="card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
