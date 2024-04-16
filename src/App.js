import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        console.log(response.data);
        setCompressedImage(response.data.compressed_image);
      })
      .catch(error => {
        console.error('Error uploading and compressing image:', error);
      });
  };

  const handleDownloadClick = () => {
    // Create a temporary link element
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(compressedImage);
    downloadLink.download = 'compressed_image.jpg';
    // Simulate click on the link to start download
    downloadLink.click();
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {image && (
        <div>
          <h2>Original Image Preview:</h2>
          <img src={URL.createObjectURL(image)} alt="Uploaded" />
        </div>
      )}
      {compressedImage && (
        <div>
          <h2>Compressed Image Preview:</h2>
          <img src={URL.createObjectURL(compressedImage)} alt="Compressed" />
          <button onClick={handleDownloadClick}>Download Compressed Image</button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
