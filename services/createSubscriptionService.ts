import axios from 'axios';

const BASE_URL = 'http://192.168.1.8:9099';

export const createSubscription = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/superadmin/subscription`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || 'Failed to create subscription');
  }
  
};


export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/superadmin/subscriptions`);
    return response.data; // expected: [{ id: string, name: string, ... }]
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || 'Failed to fetch subscriptions');
  }
};
