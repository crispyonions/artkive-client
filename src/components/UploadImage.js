import React, { useState, useEffect } from "react";
import ImageDetailsPage from "../components/ImageDetailsPage";
import { getFolders } from "../managers/FolderManager.js";
import { createImage } from "../managers/ImageManager.js";
import { getTags } from "../managers/TagManager.js";
import './UploadImage.css';

export const UploadImage = () => {
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchFolders();
    fetchTags();
  }, []);

  const fetchFolders = () => {
    getFolders()
      .then((data) => {
        setFolders(data);
      })
      .catch((error) => console.error("Error fetching folders:", error));
  };

  const fetchTags = () => {
    getTags()
      .then((data) => {
        console.log(data);
        setTags(data);
      })
      .catch((error) => console.error("Error fetching tags:", error));
  };

  const handleImageChange = (e) => {
    const link = e.target.value.trim();
    setImageLink(link);

    // Create image preview
    if (link) {
      setImagePreview(link);
    } else {
      setImagePreview(null);
    }
  };

  const handleDescriptionChange = (e) => {
    const desc = e.target.value;
    setDescription(desc);
  };

  const handleFolderChange = (e) => {
    const folderId = e.target.value;
    setSelectedFolder(folderId);
  };

  const handleTagChange = (e) => {
    const tagId = parseInt(e.target.value);
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagId)) {
        return prevSelectedTags.filter((id) => id !== tagId);
      } else {
        return [...prevSelectedTags, tagId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageLink) {
      setUploadStatus("Please enter an image link.");
      return;
    }

    if (!selectedFolder) {
      setUploadStatus("Please select a folder.");
      return;
    }

    const imageData = {
      description: description,
      img_url: imageLink,
      folder: parseInt(selectedFolder),
      tags: selectedTags,
    };

    createImage(imageData)
      .then(() => {
        setUploadStatus("Image uploaded successfully.");
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  return (
    <form className="upload-image-form" onSubmit={handleSubmit}>
      <h2>Upload Image</h2>

      <div className="form-group">
        <label htmlFor="imageLink">Image Link:</label>
        <input
          type="text"
          id="imageLink"
          value={imageLink}
          onChange={handleImageChange}
        />
      </div>

      {imagePreview && (
        <div className="image-preview">
          <h3>Image Preview:</h3>
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="folder">Select Folder:</label>
        <select
          id="folder"
          value={selectedFolder}
          onChange={handleFolderChange}
        >
          <option value="">-- Select Folder --</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.folder_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Select Tags:</label>
        <div className="checkbox-group">
          {tags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                name="tags"
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={handleTagChange}
              />
              {tag.tag_name}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <button type="submit">Upload</button>

      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
};

export default UploadImage;
