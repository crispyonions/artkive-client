import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFolders, createFolder, deleteFolder, getImagesByFolder } from '../managers/FolderManager';
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userFolders, setUserFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderImages, setFolderImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Newly added state

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
      getFolders()
        .then(data => {
          setUserFolders(data);
        })
        .catch(error => console.error('Error fetching user folders:', error));
    };

    fetchUserData();
    fetchUserFolders();
  }, [userId]);

  const handleFolderClick = folderId => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId);
    if (selectedFolder === folderId) {
      setFolderImages([]);
    } else {
      getImagesByFolder(folderId)
        .then(data => {
          setFolderImages(data);
        })
        .catch(error => console.error('Error fetching folder images:', error));
    }
  };

  const handleNewFolderNameChange = e => {
    setNewFolderName(e.target.value);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim() === '') {
      console.error('Folder name cannot be empty');
      return;
    }

    createFolder({ folder_name: newFolderName })
      .then(data => {
        setUserFolders([...userFolders, data]);
        setNewFolderName('');
        setIsCreatingFolder(false);
      })
      .catch(error => console.error('Error creating folder:', error));
  };

  const handleCancelCreateFolder = () => {
    setIsCreatingFolder(false);
    setNewFolderName('');
  };

  const handleDeleteFolder = folderId => {
    deleteFolder(folderId)
      .then(() => {
        setUserFolders(userFolders.filter(folder => folder.id !== folderId));
        if (selectedFolder === folderId) {
          setSelectedFolder(null);
          setFolderImages([]);
        }
      })
      .catch(error => console.error('Error deleting folder:', error));
  };

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  return (
    <div className="container">
      {userData ? (
        <div>
          <h3>{userData.username}'s artkive</h3>
          <p>{userData.bio}</p>

          <div className="create-folder-section">
            <h4>Create New Folder:</h4>
            {!isCreatingFolder ? (
              <button className="add-folder-button" onClick={() => setIsCreatingFolder(true)}>Add Folder</button>
            ) : (
              <div>
                <input type="text" value={newFolderName} onChange={handleNewFolderNameChange} />
                <button onClick={handleCreateFolder}>Submit</button>
                <button onClick={handleCancelCreateFolder}>Cancel</button>
              </div>
            )}
          </div>

          {userFolders && userFolders.length > 0 ? (
            <div>
              <h4>Saved Folders:</h4>
              <ul className="folder-list">
                {userFolders.map(folder => (
                  <li key={folder.id}>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => handleFolderClick(folder.id)}
                    >
                      {folder.folder_name}
                    </button>

                    {selectedFolder === folder.id && (
                      <div>
                        <h5>Images in the folder: <Link to="/uploadimage">
                          <button>+</button>
                        </Link></h5>
                        <ul className="folder-images">
                          {folderImages && folderImages.length > 0 ? (
                            folderImages.map(image => (
                              <li key={image.id}>
                                <Link to={`/image/${image.id}`} onClick={() => handleImageClick(image)}>
                                  <img src={image.img_url} alt={image.description} />
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li>No images in the folder.</li>
                          )}
                        </ul>
                        <button onClick={() => handleDeleteFolder(folder.id)}>Delete Folder</button>
                        
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
