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
        fetch(URL_POST_REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
        }).then((response) => {
            debugger;
            return response.json();
        }).then((data) => {
            debugger;
            return Promise.resolve(data);
        }).catch((error) => {
            debugger;
            console.log(error);
            return Promise.reject();
        });
    }

    return [makeRequest]
}

export {
    useRegister
}