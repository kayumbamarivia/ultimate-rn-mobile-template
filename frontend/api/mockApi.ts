import axios from 'axios';
export const mockAPI = axios.create({
    baseURL: 'https://68353eaacd78db2058c0afc3.mockapi.io/legends/api/',
})