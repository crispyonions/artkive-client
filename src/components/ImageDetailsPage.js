import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteImage } from '../managers/ImageManager';
import './ImageDetailsPage.css';

const ImageDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchImageDetails = () => {
      fetch(`http://localhost:8000/images/${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('lu_token')}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }
          return response.json();
        })
        .then(data => {
          setImage(data);
        })
        .catch(error => console.error('Error fetching image:', error));
    };

    fetchImageDetails();
  }, [id]);

  const handleDelete = () => {
    deleteImage(id)
      .then(() => {
        console.log(`Image with ID ${id} deleted successfully`);
        setIsDeleted(true);
        navigate('/home'); // Redirect to the home page
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };

  const handleEdit = () => {
    const newDescription = prompt('Enter a new description:', image.description);

    if (newDescription) {
      const updatedImage = {
        ...image,
        description: newDescription,
      };

      setImage(updatedImage);
    }
  };

  return (
    <div className="container">
      {image && !isDeleted && (
        <div className="image-details">
          <p>{image.description}</p>
          <img src={image.img_url} alt={image.description} />
        </div>
      )}

      {isDeleted && <p>Image deleted successfully.</p>}

      <div className="button-group">
        <button onClick={handleDelete}>Delete Image</button>
        <button onClick={handleEdit}>Edit Description</button>
      </div>
    </div>
  );
};

export default ImageDetailsPage;
