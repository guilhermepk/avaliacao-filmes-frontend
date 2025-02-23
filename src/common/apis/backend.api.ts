import axios from 'axios';
import { LoginPayloadinterface, LoginRespondeInterface } from '../interfaces/login-request';
import { RegisterUserPayloadInterface, RegisterUserResponseInterface } from '../interfaces/register-user-requests';

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
        .then(response => response.data)
        .catch(error => {
            const data = error.response.data
            window.alert(`${data.statusCode} - ${data.message}`)
        })
}

export async function login(nickname: string, password: string): Promise<LoginRespondeInterface> {
    const payload: LoginPayloadinterface = { nickname, password };

    return await post(`auth/login`, payload);
}

export async function registerUser(name: string, nickname: string, password: string): Promise<RegisterUserResponseInterface> {
    const payload: RegisterUserPayloadInterface = { name, nickname, password };
    return await post(`user/register`, payload);
}