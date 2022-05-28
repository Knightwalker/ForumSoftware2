import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext({});

const AppContextProvider = (props) => {
    const [state, setState] = useState({
        status: "INIT"
    });
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: "",
        role: -1,
        token: null
    });

    const handleUpdateContainerStatus = (status) => {
        setState((oldState) => {
            const newState = JSON.parse(JSON.stringify(oldState));
            newState.status = status;
            return newState;
        });
    };

    useEffect(() => {
        const componendDidMount = async () => {
            handleUpdateContainerStatus("LOADING");
            try {
                let store = localStorage.getItem('LARAVEL_STORE');
                if (store === null) {
                    setUser((oldState) => {
                        const newState = JSON.parse(JSON.stringify(oldState));
                        newState.isLoggedIn = false;
                        return newState;
                    });
                } else {
                    store = JSON.parse(store);
                    setUser((oldData) => {
                        const newData = JSON.parse(JSON.stringify(oldData));
                        newData.isLoggedIn = true;
                        newData.username = store.username;
                        newData.role = store.role;
                        newData.token = store.token;
                        return newData;
                    });
                }
                // TODO: Check local storage for token.
                handleUpdateContainerStatus("SUCCESS");
            } catch (err) {
                handleUpdateContainerStatus("ERROR");
            }
        };
        componendDidMount();
    }, []);

    return (
        <>
            {(state.status === "INIT" || state.status === "LOADING") && (
                <div>Loading...</div>
            )}

            {(state.status === "ERROR") && (
                <div>Error</div>
            )}

            {(state.status) === "SUCCESS" && (
                 <AppContext.Provider value={{
                    appState: state,
                    user: user,
                    setUser: setUser
                }}>
                    {props.children}
                </AppContext.Provider>
            )}
        </>
    )
};

export default AppContextProvider;
export { AppContext }