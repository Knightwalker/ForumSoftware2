import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditTopicPage.css";

// Services, Hooks
import { useGetById, useUpdateById } from "../../../services/TopicService";
import { urlViewTopic } from "../../../routes/endpoints";

const EditTopicPage = () => {
    const [state, setState] = useState({
        form: {
            data: {
                name: "",
                description: ""
            },
            isInvalid: true,
            status: "INIT",
            message: ""
        }
    });
    const { topic_id } = useParams();
    const hookNavigate = useNavigate();
    const [makeRequest_GetById] = useGetById();
    const [makeRequest_UpdateById] = useUpdateById();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: state.form.data.name,
            description: state.form.data.description,
            topic_id: topic_id
        };

        try {
            const result = await makeRequest_UpdateById(topic_id, payload);
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.form.status = "SUCCESS";
                newState.form.message = result.message;
                return newState;
            });
            setTimeout(() => {
                const endpoint = urlViewTopic(topic_id)
                hookNavigate(endpoint);
            }, 1000);
        } catch (error) {
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.form.status = "ERROR";
                newState.form.message = error.message;
                return newState;
            })
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState((oldState) => {
            const newState = JSON.parse(JSON.stringify(oldState));
            newState.form.data[name] = value;
            return newState;
        });
    };

    // ComponentDidMount
    useEffect(() => {
        const componentDidMount = async () => {
            try {
                const result = await makeRequest_GetById(topic_id);
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.form.data.name = result.data.name;
                    newState.form.data.description = result.data.description;
                    return newState;
                });
                console.log(result);
            } catch (error) {
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.form.status = "ERROR";
                    newState.form.message = error.message;
                    return newState;
                })
                console.log(error);
            }
        }
        componentDidMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Component Will Update
    useEffect(() => {
        const isInvalid = (() => {
            if (state.form.data.name.length <= 0) {
                return true;
            }
            if (state.form.data.description.length <= 0) {
                return true;
            }
            return false;
        })();

        setState((oldState) => {
            const newState = JSON.parse(JSON.stringify(oldState));
            newState.form.isInvalid = isInvalid;
            return newState;
        });
    }, [
        state.form.data.name,
        state.form.data.description
    ]);

    return (
        <div className="EditTopicPage">
            <h1 className="text-center">Edit Topic</h1>

            <div className="row pt-2 pb-2">
                <div className="col-0 col-sm-2 col-lg-4"></div>
                <div className="col-12 col-sm-8 col-lg-4">
                    <form onSubmit={handleSubmit} className="custom-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input name="name" id="name" className="form-control" type="text" placeholder="Enter name" value={state.form.data.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" className="form-control" rows="3" placeholder="Enter description" value={state.form.data.description} onChange={handleChange}></textarea>
                        </div>
                        {state.form.status === "SUCCESS" && (
                            <div className="success-message">
                                {state.form.message}
                            </div>
                        )}
                        {state.form.status === "ERROR" && (
                            <div className="error-message">
                                {state.form.message}
                            </div>
                        )}
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary" disabled={state.form.isInvalid}>Edit</button>
                        </div>
                    </form>
                </div>
                <div className="col-0 col-sm-2 col-lg-4"></div>
            </div>

        </div>
    )
}

export default EditTopicPage;