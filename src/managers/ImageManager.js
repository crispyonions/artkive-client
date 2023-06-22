export const getImages = () => {
    return fetch('http://localhost:8000/images/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then(response => response.json());
  };
  
  export const getImagesByFolder = (folderId) => {
    return fetch(`http://localhost:8000/images/?folder=${folderId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then(response => response.json());
  };
  
  export const getMusers = () => {
    return fetch('http://localhost:8000/Musers/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then(response => response.json());
  };
  
  export const createImage = (image) => {
    return fetch('http://localhost:8000/images/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
      body: JSON.stringify(image),
    })
      .then(response => response.json());
  };
  
  export const deleteImage = (id) => {
    return fetch(`http://localhost:8000/images/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    });
  };
  