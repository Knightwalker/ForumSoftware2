import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import {
    URL_POST_REGISTER,
    URL_POST_LOGIN,
    URL_POST_LOGOUT,
    URL_IDENTITY_GET_BY_TOKEN,
    URL_IDENTITY_UPDATE_BY_TOKEN
} from "./endpoints";

const useRegister = () => {
    const makeRequest = async (payload) => {
        try {
            const response = await fetch(URL_POST_REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            // CORS for laravel
            if (response.status === 419) {
                let error = {};
                error.errors = ["general server error"];
                return Promise.reject(error);
            }
            // Data validation laravel
            else if (response.status === 422) {
                let error = {};
                error.errors = [...data.errorsArr];
                return Promise.reject(error);
            }
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return [makeRequest]
}

const useLogin = () => {
    const makeRequest = async (payload) => {
        try {
            const response = await fetch(URL_POST_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            // CORS for laravel
            if (response.status === 419) {
                let error = {};
                error.errors = ["general server error"];
                return Promise.reject(error);
            }
            // Handle Errors
            else if (response.status > 399 && response.status <= 599) {
                let error = {};
                error.errors = [...data.errorsArr];
                return Promise.reject(error);
            }
            return Promise.resolve(data);
        } catch (error) {
            console.log(error);
            return Promise.reject();
        }
    }

    return [makeRequest]
}

const useLogout = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async (payload) => {
        try {
            const response = await fetch(URL_POST_LOGOUT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            // CORS for laravel
            if (response.status === 419) {
                let error = {};
                error.errors = ["general server error"];
                return Promise.reject(error);
            }
            // Handle Errors
            else if (response.status > 399 && response.status <= 599) {
                let error = {};
                error.errors = [...data.errorsArr];
                return Promise.reject(error);
            }
            return Promise.resolve(data);
        } catch (error) {
            console.log(error);
            return Promise.reject();
        }
    }

    return [makeRequest]
}

const useGetByToken = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async () => {
        const endpoint = URL_IDENTITY_GET_BY_TOKEN;
        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            // CORS for laravel
            if (response.status === 419) {
                let error = {};
                error.errors = ["general server error"];
                return Promise.reject(error);
            }
            // Handle Errors
            else if (response.status > 399 && response.status <= 599) {
                let error = {};
                error.errors = [...data.errorsArr];
                return Promise.reject(error);
            }
            return Promise.resolve(data);
        } catch (error) {
            console.log(error);
            return Promise.reject();
        }
    }

    return [makeRequest]
}

const useUpdateByToken = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async (payload) => {
        const endpoint = URL_IDENTITY_UPDATE_BY_TOKEN;
        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            // CORS for laravel
            if (response.status === 419) {
                let error = {};
                error.errors = ["general server error"];
                return Promise.reject(error);
            }
            // Handle Errors
            else if (response.status > 399 && response.status <= 599) {
                let error = {};
                error.errors = [...data.errorsArr];
                return Promise.reject(error);
            }
            return Promise.resolve(data);
        } catch (error) {
            console.log(error);
            return Promise.reject();
        }
    }

    return [makeRequest]
}

export {
    useRegister,
    useLogin,
    useLogout,
    useGetByToken,
    useUpdateByToken
}