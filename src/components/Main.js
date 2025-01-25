import React, { useEffect } from 'react';
import Navbar from './Navbar';
import CollaborationPost from './CollaborationPost';
import ('./Main.css')

const Main = () => {
  useEffect(() => {
    // Check if the token exists
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      window.location.href = '/auth';
    }
  }, []);

  return (
    <div className='main'>
        <Navbar/>
        <CollaborationPost/>
        

    
    
    </div>
  );
};

export default Main;
