import axios from 'axios';

const api = axios.create({
  baseURL: `https://loja-virtual-gamma.vercel.app`,
});

export default api;
