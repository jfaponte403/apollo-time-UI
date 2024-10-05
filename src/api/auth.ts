import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export interface LoginResponse {
    message: string;
}

export interface ErrorResponse {
    message: string;
}

export const login = async (
    username: string,
    password: string
): Promise<LoginResponse | undefined> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(API_URL, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        handleLoginError(error);
        return undefined;
    }
};

const handleLoginError = (error: unknown): void => {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage = axiosError.response?.data.message || "An unexpected error occurred";
    console.error("Login Error:", errorMessage);
    throw new Error(errorMessage);
};
