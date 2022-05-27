import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import {
    URL_POSTS_CREATE,
    URL_POSTS_GET_BY_ID,
    URL_POSTS_UPDATE_BY_ID,
    URL_POSTS_DELETE_BY_ID
} from "./endpoints";

const useCreate = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async (payload) => {
        const endpoint = URL_POSTS_CREATE;
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(payload)
            });
            debugger;
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
                error.message = data.message;
                error.errors = data.errors ? [...data.errorsArr] : [];
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

const useGetById = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async (post_id) => {
        const endpoint = URL_POSTS_GET_BY_ID(post_id);
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

const useUpdateById = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async (post_id, payload) => {
        const endpoint = URL_POSTS_UPDATE_BY_ID(post_id);
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
                error.message = data.message;
                error.errors = data.errors ? [...data.errorsArr] : [];
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

const useDeleteById = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async (topic_id) => {
        const endpoint = URL_POSTS_DELETE_BY_ID(topic_id);
        try {
            const response = await fetch(endpoint, {
                method: "DELETE",
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
                error.message = data.message;
                error.errors = data.errors ? [...data.errorsArr] : [];
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
    useCreate,
    useGetById,
    useUpdateById,
    useDeleteById
}