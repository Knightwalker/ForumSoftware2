import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditForumPage.css";

// Services, Hooks
import { useGetById, useUpdateById } from "../../../services/ForumService";

const EditForumPage = () => {
    const [state, setState] = useState({
        form: {
            data: {
                parent_id: "",
                type: "",
                name: "",
                description: "",
                image_url: "",
            },
            isInvalid: true,
            hasErrors: false,
            errorMessage: ""
        }
    });
    const { forum_id } = useParams();
    const hookNavigate = useNavigate();
    const [makeRequest_GetById] = useGetById();
    const [makeRequest_UpdateById] = useUpdateById();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState((oldState) => {
            const newState = JSON.parse(JSON.stringify(oldState));
            newState.form.data[name] = value;
            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            parent_id: state.form.data.parent_id,
            type: state.form.data.type,
            name: state.form.data.name,
            description: state.form.data.description,
            image_url: state.form.data.image_url
        };

        try {
            const result = await makeRequest_UpdateById(forum_id, payload);
            console.log(result);
            hookNavigate("/");
        } catch (error) {
            console.log(error);
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.form.hasErrors = true;
                newState.form.errorMessage = error.message;
                return newState;
            });
        }
    }

    // ComponentDidMount
    useEffect(() => {
        async function componentDidMount() {
            try {
                const result = await makeRequest_GetById(forum_id);
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.form.data.parent_id = result.data.parent_id;
                    newState.form.data.type = result.data.type;
                    newState.form.data.name = result.data.name;
                    newState.form.data.description = result.data.description;
                    newState.form.data.image_url = result.data.image_url;
                    newState.form.isInvalid = false;
                    return newState;
                });
            } catch (error) {
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
        state.form.data.parent_id,
        state.form.data.type,
        state.form.data.name,
        state.form.data.description,
        state.form.data.image_url
    ]);

    return (
        <div className="EditForumPage">
            <h1 className="text-center">Edit Forum</h1>

            <div className="row pt-2 pb-2">
                <div className="col-0 col-sm-2 col-lg-4"></div>
                <div className="col-12 col-sm-8 col-lg-4">
                    <form onSubmit={handleSubmit} className="custom-form">
                        <div className="form-group">
                            <label htmlFor="parent_id">Parent Id</label>
                            <input name="parent_id" id="parent_id" className="form-control" type="number" placeholder="Enter parent_id or leave empty for root level" value={state.form.data.parent_id} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select name="type" id="type" className="form-control" value={state.form.data.type} onChange={handleChange}>
                                <option value="category">category</option>
                                <option value="forum">forum</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input name="name" id="name" className="form-control" type="text" placeholder="Enter name" value={state.form.data.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" className="form-control" rows="3" placeholder="Enter description" value={state.form.data.description} onChange={handleChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image_url">Image URL</label>
                            <input name="image_url" id="image_url" className="form-control" type="text" placeholder="Enter image url" value={state.form.data.image_url} onChange={handleChange} />
                        </div>
                        {state.form.hasErrors && (
                            <div className="error-message">
                                {state.form.errorMessage}
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

export default EditForumPage;