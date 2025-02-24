import axios, { AxiosRequestConfig } from 'axios';
import { LoginPayloadType, LoginResponseType } from './types/login-request';
import { RegisterUserPayloadType, RegisterUserResponseType } from './types/register-user-requests';
import { FindListsByUserResponseType } from './types/find-lists-by-user-requests';
import { CreateListPayloadType, CreateListResponseType } from './types/create-list.requests';
import { VisibilitiesEnum } from './enums/visibilities.enum';
import { Content } from './types/content.type';
import { ContentTypesEnum } from './enums/content-type.enum';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        } else throw error;

        console.log(error, `aaaa`)
    }
);

async function post<T>(endpoint: string, payload?: Object): Promise<T> {
    return await api.post<T>(endpoint, payload).then(response => response.data);
}

async function get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return await api.get<T>(endpoint, config).then(response => response.data);
}

export async function login(nickname: string, password: string): Promise<LoginResponseType> {
    const payload: LoginPayloadType = { nickname, password };

    return await post<LoginResponseType>(`auth/login`, payload);
}

export async function registerUser(name: string, nickname: string, password: string): Promise<RegisterUserResponseType> {
    const payload: RegisterUserPayloadType = { name, nickname, password };
    return await post<RegisterUserResponseType>(`user/register`, payload);
}

export async function findListsByUser(): Promise<FindListsByUserResponseType> {
    return await get<FindListsByUserResponseType>(`list/find-by-user`);
}

export async function createList(name: string, visibility: VisibilitiesEnum, contents: Content[]): Promise<CreateListResponseType> {
    const payload: CreateListPayloadType = { name, visibility, contents };

    return await post(`list/create`, payload);
}

export async function searchContent(type: ContentTypesEnum, query: string, page?: number){
    const params = {
        page
    };

    return await get(`content/search/${type}/${query}`, { params });
}