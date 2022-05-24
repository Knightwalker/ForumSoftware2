import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateTopicPage.css";

// Services, Hooks
import { useCreate } from "../../../services/TopicService";
import { urlViewForum } from "../../../routes/endpoints";

const CreateTopicPage = () => {
    const [state, setState] = useState({
        form: {
            data: {
                name: "",
                description: ""
            },
            isInvalid: true,
            hasErrors: false,
            errorMessage: ""
        }
    });
    const { forum_id } = useParams();
    const hookNavigate = useNavigate();
    const [makeRequest] = useCreate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: state.form.data.name,
            description: state.form.data.description,
            forum_id: forum_id
        };

        try {
            await makeRequest(payload);
            const endpoint = urlViewForum(forum_id)
            hookNavigate(endpoint);
        } catch (error) {
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.form.hasErrors = true;
                newState.form.errorMessage = error.message;
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
        <div className="CreateTopicPage">
            <h1 className="text-center">Create Topic</h1>

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
                        {state.form.hasErrors && (
                            <div className="error-message">
                                {state.form.errorMessage}
                            </div>
                        )}
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary" disabled={state.form.isInvalid}>Create</button>
                        </div>
                    </form>
                </div>
                <div className="col-0 col-sm-2 col-lg-4"></div>
            </div>

        </div>
    )
}

export default CreateTopicPage;