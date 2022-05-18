import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext({});

const AppContextProvider = (props) => {
    const [state, setState] = useState({
        status: "INIT"
    });
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: "BOB"
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
                // TODO: call auth service
                setUser((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.isLoggedIn = false;
                    return newState;
                });
                handleUpdateContainerStatus("SUCCESS");
            } catch (err) {
                handleUpdateContainerStatus("ERROR");
            }
        };
        componendDidMount();
    }, []);

    return (
        <AppContext.Provider value={{
            appState: state,
            user: user
        }}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;
export { AppContext }