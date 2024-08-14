

import axios from 'axios';
import apiClient from '../interceptor';

  export const createBlog = (formData: any) => {
    const token = localStorage.getItem('token');
    return axios.post('http://localhost:8080/api/v1/blog/create',formData,
         {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }}
    )
    
};
export const updateBlog = (formData: any,id:any) => {
  const token = localStorage.getItem('token');
  return axios.put('http://localhost:8080/api/v1/blog/update/'+id,formData,
       {
      headers: {
        'Authorization': `Bearer ${token}`, 
      }}
  )
  
};
export const getBlogs = (page:number) => {
    return apiClient.get('blog/all'+'?page='+page);
};
export const deleteBlog = (id:any) => {
  return apiClient.delete('blog/delete/'+id);
};
export const getBlogById = (id:any,page:any|null=1) => {
    return apiClient.get('/blog/blog/'+id+'?page='+page);
};
export const getBlogMyBlogs = (id:any,page:any|null=1) => {
  return apiClient.get('/blog/my-blogs/?page='+page);
};

export const likeBlog = (id:any) => {
  return apiClient.put('blog/like/'+id);
};

export const bookmarkBlog = (id:any) => {
  return apiClient.post('bookmark/save/'+id);
};
export const getBookmarks = () => {
  return apiClient.get('/bookmark/my-bookmarks');
};
export const removeBookmark = (id:any) => {
  return apiClient.delete('/bookmark/remove/'+id);
};

export const addComment = (id:any,comment:any) => {
  return apiClient.put('/blog/comment/'+id,comment);
};


export const deleteComment = (id:any) => {
  return apiClient.delete('/blog/comment/'+id);
};


export const updateComment = (id:any,comment:any) => {
  return apiClient.put('/blog/comment/update/'+id,comment);
};
