import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "./Create.css";

const Create = () => {
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    title: '',
    location: '',
    description: '',
    date: ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { title, location, description, date } = form;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('date', date);

    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      await axios.post('http://localhost:5000/api/journals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert(`${location} memories created!`);  
      navigate('/');                           

      setForm({ title: '', location: '', description: '', date: '' });
      setImages([]);
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to create journal entry');
      }
    }
  };

  return (
    <div className="laptop-wrapper">
      <div className="laptop-screen">
        <div className="create-container">
          <h2>Add a Travel Story</h2>
          <form onSubmit={handleSubmit} className='create-form'>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Write your experience"
              rows="5"
              value={form.description}
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {error && (
              <p className='error'>{error}</p>
            )}
            <button type="submit" className='create-btn'>Create</button>
          </form>
        </div>
      </div>
      <div className="laptop-base"></div>
    </div>
  );
};

export default Create;
