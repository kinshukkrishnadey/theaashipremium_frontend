import axios from 'axios';
import { User } from '../types/User';

const API_BASE = 'http://192.168.1.8:9099/auth';

export default {
  sendOtp: (phoneNumber: string) =>
    axios.post(`${API_BASE}/send-otp`, { phoneNumber }),

  verifyOtp: async (phoneNumber: string, otp: string): Promise<User> => {
    const res = await axios.post(`${API_BASE}/verify-otp`, { phoneNumber, otp });
    return res.data;
  }
};
