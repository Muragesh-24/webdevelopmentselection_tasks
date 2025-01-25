import React, { useState } from 'react';
import './Auth.css'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);  // Toggle between login and register
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    email: '',
    password: '',
    interests: ''
  });


  //// I AGREE THIS HANDLECHANGE FUCTION I JUST COPY PASTED FROM MY LAST PROJECT AS I WAS GETTING ERROR DURING BUILDING SO I HAVE TO STUDY ABOUT IT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? 'http://localhost:3000/login'  // Login route
      : 'http://localhost:3000/register';  // Register route

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);  // Save token in localStorage
      alert('Authentication successful');
      window.location.href = '/main';  // Redirect to the main page
    } else {
      alert(data.message || 'Something went wrong');
    }
  };

  return (
    <div className='AUTH'>
         <div className='authleft'>
         <h1>EngiGrow</h1>
  <p>
    Connect with fellow professionals, collaborate on projects, and grow your
    network. Welcome to the ultimate platform for innovation and teamwork!
  </p>
         </div>
        <div className='authright'>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="interests"
              placeholder="Interests"
              value={formData.interests}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <button onClick={() => setIsLogin((prev) => !prev)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
      </div>
     
    </div>
  );
};

export default Auth;
