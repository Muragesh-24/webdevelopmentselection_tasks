import React, { useState, useEffect } from 'react';
import './CollaborationPost.css';

const CollaborationPost = () => {
  const [collaborationTitle, setCollaborationTitle] = useState('');
  const [collaborationDescription, setCollaborationDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Track whether we're editing a post
  const [currentPostId, setCurrentPostId] = useState(null); // Track the post being edited

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/api/collaborations');
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  // Handle form submission for creating a collaboration post
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first!');
      return;
    }

    const response = await fetch('http://localhost:3000/collaborations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: collaborationTitle,
        description: collaborationDescription,
      }),
    });

    if (response.ok) {
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setCollaborationTitle('');
      setCollaborationDescription('');
    } else {
      alert('Failed to create post');
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first!');
      return;
    }

    const response = await fetch(`http://localhost:3000/collaborations/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment }),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
      setComment('');
    } else {
      alert('Failed to add comment');
    }
  };

  // Toggle comments visibility
  const toggleCommentsVisibility = (postId) => {
    setPosts(posts.map((post) => 
      post._id === postId 
        ? { ...post, showComments: !post.showComments } 
        : post
    ));
  };

  // Handle editing post
  const handleEditPost = (postId, title, description) => {
    setIsEditing(true);
    setCurrentPostId(postId);
    setCollaborationTitle(title);
    setCollaborationDescription(description);
  };

  // Handle updating post
  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first!');
      return;
    }

    const response = await fetch(`http://localhost:3000/collaborations/${currentPostId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: collaborationTitle,
        description: collaborationDescription,
      }),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      setPosts(posts.map((post) => (post._id === currentPostId ? updatedPost : post)));
      setIsEditing(false);
      setCollaborationTitle('');
      setCollaborationDescription('');
    } else {
      alert('Failed to update post');
    }
  };

  return (
    <div className="collaboration-post">
      <h2>{isEditing ? 'Edit Collaboration Post' : 'Create a Collaboration Post'}</h2>
      <form onSubmit={isEditing ? handleUpdatePost : handlePostSubmit}>
        <input
          type="text"
          value={collaborationTitle}
          onChange={(e) => setCollaborationTitle(e.target.value)}
          placeholder="Post title"
          required
        />
        <textarea
          value={collaborationDescription}
          onChange={(e) => setCollaborationDescription(e.target.value)}
          placeholder="Post description"
          required
        />
        <button type="submit">{isEditing ? 'Update Post' : 'Post'}</button>
      </form>

      <h3>Collaboration Posts</h3>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <p>Posted by {post.postname} on {new Date(post.createdAt).toLocaleString()}</p>

            <div className="comments">
              <button onClick={() => toggleCommentsVisibility(post._id)}>
                {post.showComments ? 'Hide Comments' : 'View All Comments'}
              </button>

              {post.showComments && post.comments.length > 0 && (
                post.comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <p>{comment.text}</p>
                  </div>
                ))
              )}
            </div>

            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={() => handleCommentSubmit(post._id)}>Comment</button>
            <button onClick={() => handleEditPost(post._id, post.title, post.description)}>Edit</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CollaborationPost;
