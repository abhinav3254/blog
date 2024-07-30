# BlogRoute API

## Overview

This document provides detailed information about the routes available in the `BlogRoute` module for managing blog posts and comments.

## Base URL

All API routes are relative to the base URL: `http://yourapi.com/api/blog`

## Routes

| **Endpoint**             | **Method** | **Description**                                              | **Request**                                                                                                                                                                                                                                  | **Response**                                                                                       |
|--------------------------|------------|--------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `/test`                  | `GET`      | A simple test route to check if the API is running.        | N/A                                                                                                                                                                                                                                          | ```json { "message": "Hola from blog route" } ```                                                  |
| `/create`                | `POST`     | Create a new blog post.                                     | **Body:** <br> `title` (string) <br> `content` (string) <br> `tags` (string, comma-separated) <br> `category` (string) <br> **Form Data:** <br> `imageUrl` (optional image file)                                                          | ```json { "message": "Blog post created successfully.", "blogId": "string" } ```                  |
| `/all`                   | `GET`      | Fetch a paginated list of all blog posts.                  | **Query Params:** <br> `page` (number, default: 1) <br> `limit` (number, default: 10)                                                                                                                                                     | ```json { "totalBlogs": "number", "totalPages": "number", "currentPage": "number", "blogs": [ /* Array of blog objects */ ] } ``` |
| `/like/:id`              | `PUT`      | Like a specific blog post.                                  | **Params:** <br> `id` (string)                                                                                                                                                                                                              | ```json { "message": "Blog liked successfully.", "likes": "number" } ```                          |
| `/comment/:id`           | `PUT`      | Add a comment to a specific blog post.                      | **Params:** <br> `id` (string) <br> **Body:** <br> `comment` (string)                                                                                                                                                                     | ```json { "message": "Comment added successfully.", "comment": { /* Comment object */ } } ```      |
| `/comment/:id`           | `DELETE`   | Delete a specific comment.                                 | **Params:** <br> `id` (string)                                                                                                                                                                                                              | ```json { "message": "Comment deleted successfully." } ```                                         |
| `/comment/:id`           | `PUT`      | Update the content of a specific comment.                  | **Params:** <br> `id` (string) <br> **Body:** <br> `comment` (string)                                                                                                                                                                     | ```json { "message": "Comment updated successfully.", "comment": { /* Updated comment object */ } } ``` |
| `/my-blogs`              | `GET`      | Fetch a paginated list of blog posts authored by the logged-in user. | **Query Params:** <br> `page` (number, default: 1) <br> `limit` (number, default: 10)                                                                                                                                                     | ```json { "totalBlogs": "number", "totalPages": "number", "currentPage": "number", "blogs": [ /* Array of blog objects */ ] } ``` |
| `/update/:id`            | `PUT`      | Update a specific blog post.                                | **Params:** <br> `id` (string) <br> **Body:** <br> `title` (string) <br> `content` (string) <br> `tags` (string, comma-separated) <br> `category` (string) <br> **Form Data:** <br> `imageUrl` (optional image file)                  | ```json { "message": "Blog updated successfully.", "blog": { /* Updated blog object */ } } ```     |
| `/delete/:id`            | `DELETE`   | Delete a specific blog post.                                | **Params:** <br> `id` (string)                                                                                                                                                                                                              | ```json { "message": "Blog deleted successfully." } ```                                             |
| `/search`                | `GET`      | Search for blogs based on a search query.                   | **Query Params:** <br> `q` (string) <br> `page` (number, default: 1) <br> `limit` (number, default: 10)                                                                                                                                   | ```json { "totalBlogs": "number", "totalPages": "number", "currentPage": "number", "blogs": [ /* Array of blog objects */ ] } ``` |
| `/blog/:id`              | `GET`      | Fetch details of a specific blog post.                      | **Params:** <br> `id` (string)                                                                                                                                                                                                              | ```json { /* Blog object */ } ```                                                                 |

## Error Codes

| **Code** | **Description**                                      |
|----------|------------------------------------------------------|
| `400`    | Bad Request: Invalid input or missing required fields. |
| `404`    | Not Found: Resource not found.                      |
| `403`    | Forbidden: Unauthorized access.                     |
| `500`    | Internal Server Error: General server error.        |

## Models

### Blog
| **Field**       | **Type**  | **Description**                         |
|-----------------|-----------|-----------------------------------------|
| `title`         | String    | Title of the blog post.                 |
| `author`        | User ID   | ID of the user who authored the post.   |
| `content`       | String    | Content of the blog post.               |
| `tags`          | [String]  | Array of tags for the blog post.        |
| `category`      | String    | Category of the blog post.              |
| `imageUrl`      | String    | URL of the blog post image (optional).  |
| `readTime`      | Number    | Estimated reading time in minutes.      |
| `publishedDate` | Date      | Date when the blog was published.       |
| `comments`      | [Comment IDs] | Array of comment IDs associated with the post. |

### Comment
| **Field**   | **Type**  | **Description**                 |
|-------------|-----------|---------------------------------|
| `user`      | User ID   | ID of the user who made the comment. |
| `comment`   | String    | Content of the comment.         |
| `date`      | Date      | Date when the comment was made. |
