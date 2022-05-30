import React, { useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import "./UsersPage.css";

// Services, Hooks
import { useGetAllUsers } from "../../../services/IdentityService";

const UsersPage = () => {
    const [makeRequest] = useGetAllUsers();

    const [state, setState] = useState({
        data: []
    });

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                const result = await makeRequest();
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.data = result.data;
                    return newState;
                });
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        componentDidMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="UsersPage">
            <h1 className="text-center">Members List</h1>
            <Table data={state.data} />
        </div>
    )
}

export default UsersPage;