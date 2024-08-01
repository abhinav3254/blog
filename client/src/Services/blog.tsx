

import apiClient from '../interceptor';

  export const createBlog = (formData: any) => {
    return apiClient.post('/blog/create',formData);
};
export const getBlogs = () => {
    return apiClient.get('blog/all');
};
export const getBlogById = (id:any) => {
    return apiClient.get('/blog/blog/'+id);
};
