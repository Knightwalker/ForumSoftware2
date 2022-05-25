import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DeleteForumPage.css";

// Services, Hooks
import { useDeleteById } from "../../../services/ForumService";

const DeleteForumPage = () => {
    const [state, setState] = useState({
        status: "INIT",
        message: ""
    });
    const { forum_id } = useParams();
    const hookNavigate = useNavigate();
    const [makeRequest] = useDeleteById();

    const handleCancelDelete = () => {
        hookNavigate(`/`);
    }

    const handleDelete = async () => {
        setState((oldState) => {
            const newState = JSON.parse(JSON.stringify(oldState));
            newState.status = "LOADING";
            return newState;
        });
        try {
            const result = await makeRequest(forum_id);
            console.log(result);
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.status = "SUCCESS";
                newState.message = result.message;
                return newState;
            });
            setTimeout(() => {
                hookNavigate(`/`);
            }, 1000);
        } catch (error) {
            console.log(error);
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.status = "ERROR";
                newState.message = error.message;
                return newState;
            });
        }
    }

    return (
        <div className="DeleteForumPage">
            <div class="delete-forum">
                <h1 className="text-center">Confirm Delete Forum</h1>

                <div className="delete-forum__message">
                    {state.status === "INIT" && (
                        <p>Are you sure you want to delete this forum?</p>
                    )}
                    {state.status === "SUCCESS" && (
                        <p>{state.message}</p>
                    )}
                    {state.status === "ERROR" && (
                        <p>{state.message}</p>
                    )}
                </div>

                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Nevermind</button>
                    <button type="button" className="btn btn-primary mx-2" onClick={handleDelete}>Yes Please</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteForumPage;