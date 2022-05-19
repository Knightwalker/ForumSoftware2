import { URL_POST_REGISTER } from "./endpoints";

const useRegister2 = () => {
    const makeRequest = async (payload) => {
        try {
            debugger;
            const response = await fetch(URL_POST_REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            debugger;
            const data = await response.json();
            return Promise.resolve(data);
        } catch (error) {
            debugger;
            console.log(error);
            return Promise.reject();
        }
    }

    return [makeRequest]
}

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
            debugger;
            const data = await response.json();
            // CORS for laravel
            if (response.status === 419) {
                let error = {};
                error.errors = ["general server error"];
                return Promise.reject(error);
            }
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

export {
    useRegister
}