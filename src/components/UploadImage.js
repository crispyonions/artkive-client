import React, { useState } from "react";

export const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    if (e.target.checked) {
      setTags((prevTags) => [...prevTags, tag]);
    } else {
      setTags((prevTags) => prevTags.filter((t) => t !== tag));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the image and other data
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("tags", JSON.stringify(tags));
    formData.append("description", description);

    // Make an API request to upload the image
    // Replace the "uploadImageEndpoint" with your actual API endpoint for image upload
    fetch("uploadImageEndpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response as needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Image</h2>

      <div>
        <label htmlFor="imageUpload">Select Image:</label>
        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} />
      </div>

      <div>
        <label>Tags:</label>
        <div>
          <input type="checkbox" id="tag1" value="tag1" onChange={handleTagChange} />
          <label htmlFor="tag1">Tag 1</label>
        </div>
        <div>
          <input type="checkbox" id="tag2" value="tag2" onChange={handleTagChange} />
          <label htmlFor="tag2">Tag 2</label>
        </div>
        {/* Add more checkbox inputs for other tags */}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} />
      </div>

      <button type="submit">Upload</button>
    </form>
  );
};
export default UploadImage