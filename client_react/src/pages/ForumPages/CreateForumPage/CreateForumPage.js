import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateForumPage.css";

// Services, Hooks
import { useCreateForum } from "../../../services/ForumService";

const CreateForumPage = () => {
    const hookNavigate = useNavigate();
    const [makeRequest] = useCreateForum();
    const [state, setState] = useState({
        form: {
            data: {
                parent_id: "",
                type: "forum",
                name: "",
                description: "",
                image_url: "",
            },
            isInvalid: true
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = document.forms["CreateForumPage__form"].elements;
        const parent_id = formData["parent_id"].value;
        const type = formData["type"].value;
        const name = formData["name"].value;
        const description = formData["description"].value;
        const image_url = formData["image_url"].value;

        const payload = {
            parent_id: parent_id,
            type: type,
            name: name,
            description: description,
            image_url: image_url
        };

        try {
            const result = await makeRequest(payload);
            console.log(result);
            hookNavigate("/");
        } catch (error) {
            console.log(error);
        }
    };

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
        state.form.data.parent_id,
        state.form.data.type,
        state.form.data.name,
        state.form.data.description,
        state.form.data.image_url
    ]);

    return (
        <div className="CreateForumPage">
            <h1 className="text-center">Create Forum</h1>

            <div className="row pt-2 pb-2">
                <div className="col-0 col-sm-2 col-lg-3"></div>
                <div className="col-12 col-sm-8 col-lg-6">
                    <form id="CreateForumPage__form" onSubmit={handleSubmit} className="custom-form">
                        <div className="form-group">
                            <label htmlFor="parent_id">Parent Id</label>
                            <input name="parent_id" id="parent_id" className="form-control" type="number" placeholder="Enter ParentId or leave empty for root level" value={state.form.data.parent_id} onChange={handleChange}/>
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
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary" disabled={state.form.isInvalid}>Create</button>
                        </div>
                    </form >
                </div >
                <div className="col-0 col-sm-2 col-lg-3"></div>
            </div >
        </div>
    )
}

export default CreateForumPage;