import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  //const [resolution, setResolution] = useState(100); //initial resolution
  const [format, setFormat] = useState('JPEG'); // Initial format 

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCompressedImage = (e) => {
    const formData = new FormData();
    formData.append('image', image);
    //formData.append('resolution', resolution);
    formData.append('format', format);
  
    axios.post('http://localhost:5000/upload', formData, {
      responseType: 'blob'
    })
      .then(response => {
        console.log(response.data);
        setCompressedImage(response.data);
      })
      .catch(error => {
        console.error('Error compressing image:', error);
      });
  };

  const handleDownloadClick = () => {
    // Create a temporary link element
    const downloadUrl = window.URL.createObjectURL(new Blob([compressedImage]));
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.setAttribute('download','compressed_image.'+format.toLowerCase());
    // Simulate click on the link to start download
    document.body.appendChild(downloadLink);
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
      <button onClick={handleCompressedImage}> COMPRESS IMAGE</button>
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
