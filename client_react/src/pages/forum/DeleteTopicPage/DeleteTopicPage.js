import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DeleteTopicPage.css";

// Services, Hooks
import { useGetById, useDeleteById } from "../../../services/TopicService";
import { urlViewForum, urlViewTopic } from "../../../routes/endpoints";

const DeleteTopicPage = () => {
    const { topic_id } = useParams();
    const hookNavigate = useNavigate();
    const [makeRequest_GetById] = useGetById();
    const [makeRequest_DeleteById] = useDeleteById();

    const [state, setState] = useState({
        status: "INIT",
        message: "",
        topic: {
            id: topic_id,
            name: "",
            description: "",
            forum_id: null,
        }
    });

    const handleCancelDelete = () => {
        const url = urlViewTopic(state.topic.id);
        hookNavigate(url);
    }

    const handleDelete = async () => {
        setState((oldState) => {
            const newState = JSON.parse(JSON.stringify(oldState));
            newState.status = "LOADING";
            return newState;
        });
        try {
            const result = await makeRequest_DeleteById(topic_id);
            console.log(result);
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.status = "SUCCESS";
                newState.message = result.message;
                return newState;
            });
            setTimeout(() => {
                const url = urlViewForum(state.topic.forum_id);
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
                const result = await makeRequest_GetById(topic_id);
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.topic.name = result.data.name;
                    newState.topic.description = result.data.description;
                    newState.topic.forum_id = result.data.forum_id;
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
        <div className="DeleteTopicPage">
            <div className="delete-forum">
                <h1 className="text-center">Confirm Delete Topic</h1>

                <div className="delete-forum__message">
                    {state.status === "INIT" && (
                        <p>Are you sure you want to delete this topic?</p>
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

export default DeleteTopicPage;