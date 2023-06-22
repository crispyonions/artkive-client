export const fetchUserData = () => {
    return fetch(`http://localhost:8000/profile/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching user data:', error);
        throw error;
      });
  };
  