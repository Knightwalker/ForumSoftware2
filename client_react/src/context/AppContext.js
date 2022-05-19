import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext({});

const AppContextProvider = (props) => {
    const [state, setState] = useState({
        status: "INIT"
    });
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: "",
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
                // debugger;
                // const result = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                //     withCredentials: true
                // });
                // debugger;
                // const data = await result.blob();
                // console.log("maikatideba")
                // debugger;

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
            user: user,
            setUser: setUser
        }}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;
export { AppContext }