import axios from 'axios';

const BASE_URL = 'http://192.168.1.8:9099'; // Replace with your actual local/remote IP

export const uploadMediaToServer = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/media/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data || 'Upload failed');
  }
};

