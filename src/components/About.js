import React from 'react';
import './About.css';
import Navbar from './Navbar';

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="about-container">
      <h1>About EngiGrow</h1>
      <p>
        EngiGrow is a platform dedicated to fostering collaboration and growth among engineers, freelancers, and professionals. Whether you are looking to work on exciting projects, share knowledge, or find new opportunities, EngiGrow is the place to be.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to create a space where professionals can connect, collaborate, and grow together. We aim to break down barriers, facilitate teamwork, and support individuals in their journey to success.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Discussion Forums:</strong> Engage in meaningful discussions and share ideas.</li>
        <li><strong>Collaboration Opportunities:</strong> Post and discover exciting collaboration opportunities for various projects.</li>
        <li><strong>Job and Internship Listings:</strong> Find internships and temporary work that fit your skills.</li>
        <li><strong>Networking:</strong> Build a network of like-minded professionals and entrepreneurs.</li>
      </ul>

      <h2>Our Team</h2>
      <p>
        EngiGrow was founded by passionate engineers and entrepreneurs who believe in the power of collaboration and innovation. We are constantly working to improve and evolve the platform to meet the needs of our growing community.
      </p>

      <h2>Get Involved</h2>
      <p>
        Join us today and become part of a vibrant community of professionals who are eager to collaborate, innovate, and grow. Whether you're a developer, designer, or entrepreneur, there's something for everyone at EngiGrow.
      </p>
    </div>
    </>
  );
};

export default About;
