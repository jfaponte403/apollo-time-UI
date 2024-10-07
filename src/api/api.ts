import axios, { AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

// Define a generic response type that includes status and data
interface ApiResponse<T> {
    data: T;
    status: number;
}

const apiRequest = async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, payload?: any): Promise<ApiResponse<T>> => {
    const url = `${API_URL}${endpoint}`;
    const config = {
        method,
        url,
        data: payload,
    };

    const response: AxiosResponse<T> = await axios(config);

    // Return the response data along with the status code
    return {
        data: response.data,
        status: response.status,
    } as ApiResponse<T>;
};

export const createResource = async <T>(endpoint: string, payload: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>('POST', endpoint, payload);
};

export const readResource = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiRequest<T>('GET', endpoint);
};

export const updateResource = async <T>(endpoint: string, payload: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>('PUT', endpoint, payload);
};

export const deleteResource = async (endpoint: string): Promise<void> => {
    await apiRequest<void>('DELETE', endpoint);
};
