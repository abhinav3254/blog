import apiClient from '../interceptor';
const baseUrl = 'http://localhost:8080/api/v1/auth';

// const apiClient = axios.create({
//     baseURL: baseUrl,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

  export const signup = (formData: any) => {
    return apiClient.post('auth/register',  formData);
};
export const login = (formData: any) => {
    return apiClient.post('auth/login',  formData);
};
export const getBlogs = () => {
    return apiClient.get('blog/all');
};