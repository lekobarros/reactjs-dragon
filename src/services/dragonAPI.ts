import axios from 'axios';

import { DRAGON_API_BASE_URL } from '@/config/dragon';

const dragonAPI = axios.create({
  baseURL: DRAGON_API_BASE_URL
});

export default dragonAPI;