

import apiClient from '../interceptor';

  export const updatProfile = (formData: any) => {
    return apiClient.put('/user/profile/update',formData);
};
export const getProfile = () => {
    return apiClient.get('user/profile');
};
