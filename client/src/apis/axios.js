import axios from 'axios';
import path from './endpoints';

export const apiPrivate = axios.create({
	baseURL: path.BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
	// withCredentials indica se as requisições de controle de acesso entre sites devem ou não ser feitas utilizando credenciais
	// essa propriedade é necessária para que possamos retornar o secure cookie como resposta das requisições
});

const api = axios.create({
	baseURL: path.BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});

export default api;
