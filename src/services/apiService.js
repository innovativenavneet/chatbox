import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://127.0.0.1:8000/chat/api/';

// Service function to fetch users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}users/`); // Adjusted URL
    if (response.status === 200) {
      // Assuming the data contains a 'users' key which holds the list of users
      return response.data.users || []; // Return users or empty array if no users
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error('Error fetching users:', error); // Log error for debugging
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
