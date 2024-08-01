

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
export const getBlogById = (id:any) => {
    return apiClient.get('/blog/blog/'+id);
};
