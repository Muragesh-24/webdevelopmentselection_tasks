////////////////1. POST /register////////////////////////////////////
Method: POST
Route: /register
Description: This route allows a user to register for the application by providing their details such as name, college, email, password, and interests. It also hashes the password using bcrypt to ensure security and returns a JWT token that expires in 1 hour for user authentication.
////////////////////////////////////////////////////////////////////////

////////////////2. POST /login////////////////////////////////////////
Method: POST
Route: /login
Description: This route allows a registered user to log in by providing their email and password. It checks if the email exists, compares the password with the hashed password in the database, and returns a JWT token for authenticated access.
////////////////////////////////////////////////////////////////////////

////////////////3. POST /collaborations////////////////////////////////////////
Method: POST
Route: /collaborations
Description: This route allows a logged-in user to post a new collaboration request. The user must provide a title and description. The post is created and saved in the database with the user information. The user must be authenticated via JWT token to access this route.
////////////////////////////////////////////////////////////////////////

////////////////4. POST /collaborations/:postId/comment////////////////////////////////
Method: POST
Route: /collaborations/:postId/comment
Description: This route allows a logged-in user to comment on a specific collaboration post by providing a comment text. The post ID is passed in the URL, and the comment is added to the post. The user must be authenticated via JWT token.
////////////////////////////////////////////////////////////////////////

////////////////5. GET /api/collaborations////////////////////////////////////////
Method: GET
Route: /api/collaborations
Description: This route retrieves all collaboration posts from the database, sorted by the most recent. The response includes all posts along with their comments, if any. This route is publicly accessible.
////////////////////////////////////////////////////////////////////////

////////////////6. PUT /collaborations/:id////////////////////////////////////////
Method: PUT
Route: /collaborations/:id
Description: This route allows a logged-in user to update a collaboration post's title and description. The post ID is passed in the URL, and the user must be authenticated via JWT token. It returns the updated post if successful.
////////////////////////////////////////////////////////////////////////
