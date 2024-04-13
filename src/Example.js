import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function Example() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxSize: 5000000,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const uploadImage = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      await axios.post('https://your-backend-url.com/upload', formData);
      alert('Image uploaded successfully');
      setImage(null);
      setDescription('');
      setUploading(false);
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
      setUploading(false);
    }
  };

  return (
    <div className="App">
      <h1>Simple Instagram</h1>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {image ? (
          <img src={URL.createObjectURL(image)} alt="Uploaded image" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        ) : (
          <p>Choose an image (max 5 MB)</p>
        )}
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a description (optional)"
        style={{ width: '100%', padding: '10px', marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
      />
      <button onClick={uploadImage} disabled={uploading || !image}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default Example;