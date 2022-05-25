import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import {
    URL_TOPICS_CREATE,
    URL_TOPICS_GET_BY_ID,
} from "./endpoints";

const useCreate = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async (payload) => {
        const endpoint = URL_TOPICS_CREATE;
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

    const makeRequest = async (topic_id) => {
        const endpoint = URL_TOPICS_GET_BY_ID(topic_id);
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


export {
    useCreate,
    useGetById
}