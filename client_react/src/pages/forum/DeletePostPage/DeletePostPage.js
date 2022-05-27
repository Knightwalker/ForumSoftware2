import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DeletePostPage.css";

// Services, Hooks
import { useGetById, useDeleteById } from "../../../services/PostService";
import { urlViewTopic } from "../../../routes/endpoints";

const DeletePostPage = () => {
    const { post_id } = useParams();
    const hookNavigate = useNavigate();
    const [makeRequest_GetById] = useGetById();
    const [makeRequest_DeleteById] = useDeleteById();

    const [state, setState] = useState({
        status: "INIT",
        message: "",
        post: {
            id: post_id,
            name: "",
            content: "",
            topic_id: null,
        }
    });

    const handleCancelDelete = () => {
        debugger;
        const url = urlViewTopic(state.post.topic_id);
        hookNavigate(url);
    }

    const handleDelete = async () => {
        setState((oldState) => {
            const newState = JSON.parse(JSON.stringify(oldState));
            newState.status = "LOADING";
            return newState;
        });
        try {
            const result = await makeRequest_DeleteById(post_id);
            console.log(result);
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.status = "SUCCESS";
                newState.message = result.message;
                return newState;
            });
            setTimeout(() => {
                const url = urlViewTopic(state.post.topic_id);
                hookNavigate(url);
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

    // ComponentDidMount
    useEffect(() => {
        const componentDidMount = async () => {
            try {
                const result = await makeRequest_GetById(post_id);
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.post.name = result.data.name;
                    newState.post.content = result.data.content;
                    newState.post.topic_id = result.data.topic_id;
                    return newState;
                });
                console.log(result);
            } catch (error) {
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.status = "ERROR";
                    newState.message = error.message;
                    return newState;
                })
                console.log(error);
            }
        }
        componentDidMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="DeletePostPage">
            <div className="delete-forum">
                <h1 className="text-center">Confirm Delete Post</h1>

                <div className="delete-forum__message">
                    {state.status === "INIT" && (
                        <p>Are you sure you want to delete this post?</p>
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

export default DeletePostPage;