import React, { useState, useEffect } from 'react';
import { Search, Trash2 } from 'lucide-react';

const UserCard = ({ user, expanded, onClick, onDelete }) => (
  <div 
    className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow relative"
  >
    <h3 className="text-lg font-semibold mb-2 text-wrap break-words" onClick={onClick}>{user.email}</h3>
    {expanded && (
      <div className="mt-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Subscription Status:</strong> {user.subscription_status}</p>
        <p><strong>Subscription End Date:</strong> {user.subscription_end_date}</p>
        <p><strong>Free Plan Used:</strong> {user.free_plan_used ? 'Yes' : 'No'}</p>
      </div>
    )}
    <button
      className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100"
      onClick={(e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this user?')) {
          onDelete(user.email);
        }
      }}
    >
      <Trash2 className="h-5 w-5 text-red-500" />
    </button>
  </div>
);

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://meeel.xyz/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (email) => {
    try {
      const response = await fetch(`https://meeel.xyz/deleteuser/${email}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    Object.values(user).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center bg-white rounded-lg shadow-md">
        <Search className="ml-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-3 rounded-lg focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            expanded={expandedUser === user.id}
            onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
            onDelete={deleteUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserManagement;