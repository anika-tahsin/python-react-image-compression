import React, { useState } from 'react';
// import axios from 'axios';

const ImageCompressionApp = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(80); // Initial quality
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCompression = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('quality', quality);
  }
  //   axios.post('http://localhost:5000/compress', formData, {
  //     responseType: 'blob'
  //   })
  //     .then(response => {
  //       setCompressedImage(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error compressing image:', error);
  //     });
  // };

  const uploadHandler= async ()=>{
    const formData = new FormData();
    formData.append('photo', file); 
    const res=await fetch("http://127.0.0.1:5000/api/upload",{
      method:"POST",
      body:formData
    })
    const result= await res.json();
    console.log(result);
  }

  const handleDownload = () => {
    const url = window.URL.createObjectURL(new Blob([compressedImage]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'compressed_image.jpg');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div> 
      <h1>Image Compression</h1>
      {/* <input type="file" onChange={handleImageChange} accept="image/*" /> */}
      <input type="file" accept="image/*"  onChange={(e) => setFile(e.target.files[0])} />
      {image && (
        <div>
          <h2>Preview:</h2>
          <img src={URL.createObjectURL(image)} alt="Uploaded" /> 
        </div>
      )}
      <div>
        <label htmlFor="quality">Quality:</label>
        <input
          type="range"
          id="quality"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        />
        {quality}
      </div>
      {/* <button onClick={handleCompression}>Compress Image</button> */}
      <button onClick={uploadHandler}>Upload Image</button>
      {compressedImage && (
        <div>
          <h2>Compressed Image Preview:</h2>
          <img src={URL.createObjectURL(compressedImage)} alt="Compressed" />
          <button onClick={handleDownload}>Download Compressed Image</button>
        </div>
      )}
    </div>
  );
};

export default ImageCompressionApp;
