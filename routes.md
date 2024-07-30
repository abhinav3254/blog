# Blog Application Routes

## Authentication

- **Register**
  - `POST /api/auth/register`
  
- **Login**
  - `POST /api/auth/login`
  
- **Logout** (Optional, depends on session handling)
  - `POST /api/auth/logout`

## User Management

- **Get User Profile**
  - `GET /api/users/:userId`
  
- **Update User Profile**
  - `PUT /api/users/:userId/update`
  
- **Delete User Profile**
  - `DELETE /api/users/:userId/delete`

## Blog Post Management

- **Create Blog Post**
  - `POST /api/posts`
  
- **Get All Blog Posts**
  - `GET /api/posts`
  
- **Get Single Blog Post**
  - `GET /api/posts/:postId`
  
- **Update Blog Post**
  - `PUT /api/posts/:postId`
  
- **Delete Blog Post**
  - `DELETE /api/posts/:postId`

## Comment Management

- **Add Comment to Post**
  - `POST /api/posts/:postId/comments`
  
- **Get Comments for Post**
  - `GET /api/posts/:postId/comments`
  
- **Update Comment**
  - `PUT /api/comments/:commentId`
  
- **Delete Comment**
  - `DELETE /api/comments/:commentId`

## Categories and Tags (Optional)

- **Create Category**
  - `POST /api/categories`
  
- **Get All Categories**
  - `GET /api/categories`
  
- **Update Category**
  - `PUT /api/categories/:categoryId`
  
- **Delete Category**
  - `DELETE /api/categories/:categoryId`

- **Create Tag**
  - `POST /api/tags`
  
- **Get All Tags**
  - `GET /api/tags`
  
- **Update Tag**
  - `PUT /api/tags/:tagId`
  
- **Delete Tag**
  - `DELETE /api/tags/:tagId`

## Search and Filtering

- **Search Posts**
  - `GET /api/posts/search` (with query parameters for search terms)
  
- **Filter Posts by Category**
  - `GET /api/posts/category/:categoryId`
  
- **Filter Posts by Tag**
  - `GET /api/posts/tag/:tagId`

## Miscellaneous

- **Upload Image/Media** (if you handle file uploads)
  - `POST /api/uploads`
  
- **Get Media**
  - `GET /api/media/:mediaId`


  bookmarks and my posts and 
