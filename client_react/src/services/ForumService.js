import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import {
    URL_POST_CREATE_FORUM
} from "./endpoints";

const useCreateForum = () => {
    const { user } = useContext(AppContext);

    const makeRequest = async (payload) => {
        try {
            const response = await fetch(URL_POST_CREATE_FORUM, {
                method: "POST",
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
    useCreateForum
}