

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
export const getBlogs = (page:number) => {
    return apiClient.get('blog/all'+'?page='+page);
};
export const getBlogById = (id:any,page:any|null=1) => {
    return apiClient.get('/blog/blog/'+id+'?page='+page);
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
