import React, { useState } from "react";

const Home = () => {
  const [randomImage, setRandomImage] = useState(null);

  const handleGenerateImage = () => {
    // Get the authentication token from wherever it's stored (e.g., local storage)
    const authToken = localStorage.getItem("lu_token");

    // API request to fetch a random image from the database
    fetch("http://localhost:8000/images/random", {
      headers: {
        Authorization: `Token ${authToken}` // Include the token in the Authorization header
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched random image in the state
        setRandomImage(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>artkive</h2>
      <p>your place of reference</p>

      {randomImage && (
        <div className="homepage-image-container">
          <h3>Random Image:</h3>
          <img
            className="homepage-image"
            src={randomImage.url}
            alt="Random"
          />
          <p>{randomImage.description}</p>
        </div>
      )}

      <button onClick={handleGenerateImage}>Generate Random Image</button>
    </div>
  );
};

export default Home;
