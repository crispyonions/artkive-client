import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userFolders, setUserFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false); // Track the state of new folder input visibility

  useEffect(() => {
    const fetchUserData = () => {
      fetch(`http://localhost:8000/profile/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('lu_token')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUserData(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
    };

    const fetchUserFolders = () => {
      fetch(`http://localhost:8000/folders/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('lu_token')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUserFolders(data);
        })
        .catch(error => console.error('Error fetching user folders:', error));
    };

    fetchUserData();
    fetchUserFolders();
  }, [userId]);

  const handleFolderClick = folderId => {
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(folderId);
    }
  };

  const handleNewFolderNameChange = event => {
    setNewFolderName(event.target.value);
  };

  const handleCreateFolder = () => {
    fetch('http://localhost:8000/folders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
      body: JSON.stringify({ folder_name: newFolderName }),
    })
      .then(response => response.json())
      .then(data => {
        setUserFolders([...userFolders, data]);
        setNewFolderName('');
      })
      .catch(error => console.error('Error creating folder:', error));
  };

  const handleDeleteFolder = folderId => {
    fetch(`http://localhost:8000/folders/${folderId}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`,
      },
    })
      .then(() => {
        setUserFolders(userFolders.filter(folder => folder.id !== folderId));
        setSelectedFolder(null);
      })
      .catch(error => console.error('Error deleting folder:', error));
  };

  const handleToggleNewFolderInput = () => {
    setShowNewFolderInput(prevState => !prevState);
    setNewFolderName('');
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {userData ? (
        <div>
          <h3>{userData.username}</h3>
          <p>{userData.bio}</p>

          <div>
            <h4>Create New Folder:</h4>
            {!showNewFolderInput ? (
              <button onClick={handleToggleNewFolderInput}>
                Add New Folder
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Folder Name"
                  value={newFolderName}
                  onChange={handleNewFolderNameChange}
                />
                <button onClick={handleCreateFolder}>Create</button>
                <button onClick={handleToggleNewFolderInput}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          {userFolders && userFolders.length > 0 ? (
            <div>
              <h4>Saved Folders:</h4>
              <ul>
                {userFolders.map(folder => (
                  <li key={folder.id}>
                    <a href="#" onClick={() => handleFolderClick(folder.id)}>
                      {folder.folder_name}
                    </a>
                    {selectedFolder === folder.id && (
                      <div>
                        <h5>Images in the folder:</h5>
                        <ul>
                          {folder.images && folder.images.length > 0 ? (
                            folder.images.map(image => (
                              <li key={image.id}>
                                <img
                                  src={image.img_url}
                                  alt={image.description}
                                />
                              </li>
                            ))
                          ) : (
                            <li>No images in the folder.</li>
                          )}
                        </ul>
                        <button onClick={() => handleDeleteFolder(folder.id)}>
                          Delete Folder
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No saved folders.</p>
          )}
        </div>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
};

export default Profile;
