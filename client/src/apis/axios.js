import axios from 'axios';
import path from './endpoints';

export const apiPrivate = axios.create({
	baseURL: path.BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export default api = axios.create({
	baseURL: path.BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
