import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteImage } from '../managers/ImageManager';

const ImageDetailsPage = () => {
  const { id } = useParams();
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
        setIsDeleted(true); // Update the deletion status
        // Optionally, you can navigate the user back to a different page after deletion
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

      // Simulate the update by setting the state directly
      setImage(updatedImage);
    }
  };

  return (
    <div>
      <h2>Image Details</h2>
      {image && !isDeleted && (
        <div>
          <p>{image.description}</p>
          <img src={image.img_url} alt={image.description} />
        </div>
      )}

      {isDeleted && <p>Image deleted successfully.</p>}

      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default ImageDetailsPage;
