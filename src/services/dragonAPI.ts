import axios from 'axios';

import { DRAGON_API_BASE_URL } from '@/config/dragon';
console.log('DRAGON_API_BASE_URL', DRAGON_API_BASE_URL);
const dragonAPI = axios.create({
  baseURL: DRAGON_API_BASE_URL
});

export default dragonAPI;