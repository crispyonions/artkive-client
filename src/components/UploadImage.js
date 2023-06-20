import React, { useState, useEffect } from "react";

export const UploadImage = () => {
  const [imageLink, setImageLink] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folders, setFolders] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const tags = [
    { pk: 1, fields: { tag_name: "portrait" } },
    { pk: 2, fields: { tag_name: "still life" } },
    { pk: 3, fields: { tag_name: "animals" } },
    { pk: 4, fields: { tag_name: "nature" } },
    { pk: 5, fields: { tag_name: "fantasy" } },
    { pk: 6, fields: { tag_name: "poses" } },
    { pk: 7, fields: { tag_name: "flowers" } },
    { pk: 8, fields: { tag_name: "food" } },
    { pk: 9, fields: { tag_name: "abstract" } },
    { pk: 10, fields: { tag_name: "cityscape" } },
  ];

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = () => {
    fetch("http://localhost:8000/folders/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFolders(data);
      })
      .catch((error) => console.error("Error fetching folders:", error));
  };

  const handleImageChange = (e) => {
    const link = e.target.value.trim();
    setImageLink(link);
  };

  const handleTagChange = (e) => {
    const tagId = Number(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedTags((prevTags) => [...prevTags, tagId]);
    } else {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tagId));
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
      image_folders: selectedFolder,
      image_tags: selectedTags,
    };

    fetch("http://localhost:8000/images/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(imageData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadStatus("Image uploaded successfully.");
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Image</h2>

      <div>
        <label htmlFor="imageLink">Image Link:</label>
        <input
          type="text"
          id="imageLink"
          value={imageLink}
          onChange={handleImageChange}
        />
      </div>

      <div>
        <label htmlFor="folder">Select Folder:</label>
        <select
          id="folder"
          value={selectedFolder}
          onChange={handleFolderChange}
        >
          <option value="">-- Select Folder --</option>
          {folders.map((folder) => (
            <option key={folder.pk} value={folder.pk}>
              {folder.folder_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Tags:</label>
        {tags.map((tag) => (
          <div key={tag.pk}>
            <input
              type="checkbox"
              id={`tag-${tag.pk}`}
              value={tag.pk}
              onChange={handleTagChange}
              checked={selectedTags.includes(tag.pk)}
            />
            <label htmlFor={`tag-${tag.pk}`}>{tag.fields.tag_name}</label>
          </div>
        ))}
      </div>

      <div>
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
