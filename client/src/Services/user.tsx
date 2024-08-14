

import axios from 'axios';
import apiClient from '../interceptor';

  export const updatProfile = (formData: any) => {
    // return axios.put('/user/profile/update',formData);
    const token = localStorage.getItem('token');
    return axios.put('http://localhost:8080/api/v1/user/profile/update',formData,
         {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }}
    )
};

export const getProfile = () => {
    return apiClient.get('user/profile');
};
