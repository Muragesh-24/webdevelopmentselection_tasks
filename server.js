const express=require('express')
const mongoose=require('mongoose')
const app=express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());
app.use(express.json());

require('dotenv').config(); // Load environment variables
const connectTomongo = async () => {
    try {
      await mongoose.connect(process.env.mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true})/////////////////////////////////////////////////////////////////////////////////////////////
        
      ;
      console.log("Connected to MongoDB successfully!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
     
    }
  };
  connectTomongo()
  const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }
  
      req.user = user; // Add user info to the request
      next(); // Continue to the next middleware or route
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Invalid token." });
    }
  };
  



  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    college: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    interests: { type: [String], required: true },
  });
  
  const User = mongoose.model("User", userSchema);
  
  // Schema for the comment
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  // Schema for the collaboration post
  const collaborationPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postname:{type:String,required:true},
    createdAt: { type: Date, default: Date.now },
    comments: [commentSchema]
  });
  const CollaborationPost = mongoose.model('CollaborationPost', collaborationPostSchema);  
  
  // Register Route//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  app.post("/register", async (req, res) => {
    const { name, college, email, password, interests } = req.body;
  
    try {
    
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,
        college,
        email,
        password: hashedPassword,
        interests,
      });
  
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: newUser._id,name:newUser.name }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Error in /register:", error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Login Route////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare passwords
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id ,name:user.name}, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error in /login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  // Route to post a new collaboration
app.post('/collaborations', authenticateUser, async (req, res) => {
    
  const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
  
    try {
      const newPost = new CollaborationPost({
        title,
        description,
        postedBy: req.user.id,
        postname:req.user.name
      });
  
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to comment on a collaboration post
  app.post('/collaborations/:postId/comment', authenticateUser, async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
  
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }
  
    try {
      const post = await CollaborationPost.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const newComment = {
        user: req.user.id,
        text
      };
  
      post.comments.push(newComment);
      await post.save();
  
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
// Route to get all collaboration posts, sorted by most recent
app.get('/api/collaborations', async (req, res) => {
    try {
      const posts = await CollaborationPost.find()  // Fetch all posts
        .sort({ createdAt: -1 });  // Sort by createdAt in descending order
      res.status(200).json(posts);  // Send the posts as a response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
    


  app.put('/collaborations/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    try {
      // Validate the request body
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required.' });
      }
  
      // Find the post by ID and update it
      const updatedPost = await CollaborationPost.findByIdAndUpdate(
        id,
        { title, description },
        { new: true } // Returns the updated document
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found.' });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });











  app.listen(3000,()=>{
    console.log("server is live on port 3000")
  })