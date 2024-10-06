import axios, {AxiosError, AxiosResponse} from "axios";
import {LoginPost} from "../interfaces/LoginPost.ts";
import {LoginResponse} from "../interfaces/LoginResponse.ts";
import {ErrorResponse} from "../interfaces/ErrorResponse.ts";

const API_URL = import.meta.env.VITE_BASE_URL;


export const login = async (
    route: string,
    loginData: LoginPost
): Promise<AxiosResponse<LoginResponse> | undefined> => {
    try {
        const url = `${API_URL}/${route}`;
        return await axios.post(url, loginData);
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
