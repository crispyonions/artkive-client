export const getFolders = () => {
    return fetch('http://localhost:8000/folders/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then((response) => response.json());
  };
  
  export const createFolder = (folder) => {
    return fetch('http://localhost:8000/folders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
      body: JSON.stringify(folder),
    })
      .then((response) => response.json());
  };
  
  export const getSingleFolder = (folderId) => {
    return fetch(`http://localhost:8000/folders/${folderId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then((response) => response.json());
  };
  
  export const deleteFolder = (id) => {
    return fetch(`http://localhost:8000/folders/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    });
  };
  
  export const getImages = () => {
    return fetch('http://localhost:8000/images/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then((response) => response.json());
  };
  
  export const getImagesByFolder = (folderId) => {
    return fetch(`http://localhost:8000/images/?folder=${folderId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then((response) => response.json());
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
      .then((response) => response.json());
  };
  
  export const deleteImage = (id) => {
    return fetch(`http://localhost:8000/images/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    });
  };
  