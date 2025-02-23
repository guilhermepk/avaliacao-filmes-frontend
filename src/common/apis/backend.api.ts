import axios from 'axios';
import { LoginRespondeType, LoginPayloadType } from '../types/login-request';

let userToken: string | null = null;

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${userToken}`
    }
});

async function post(endpoint: string, payload?: Object): Promise<any> {
    return await api.post(endpoint, payload)
        .then(response => response.data);
}

export async function login(nickname: string, password: string): Promise<LoginRespondeType> {
    console.log(import.meta.env.VITE_BACKEND_URL)
    const payload: LoginPayloadType = { nickname, password };

    return await post(`auth/login`, payload);
}