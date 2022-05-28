import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

// Services, Hooks
import { useGetByToken, useUpdateByToken } from "../../../services/IdentityService";

const ProfilePage = () => {
    const [makeRequest] = useGetByToken();
    const [makeRequest_UpdateByToken] = useUpdateByToken();

    const [state, setState] = useState({
        user: {
            username: "",
            email: "",
            image_url: ""
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger;
        const username = e.currentTarget.username.value;
        const email = e.currentTarget.email.value;
        const image_url = e.currentTarget.image_url.value;
        const payload = {
            username: username,
            email: email,
            image_url: image_url
        };

        try {
            const result = await makeRequest_UpdateByToken(payload);
            setState((oldState) => {
                const newState = JSON.parse(JSON.stringify(oldState));
                newState.user.username = result.data.username;
                newState.user.email = result.data.email;
                newState.user.image_url = result.data.image_url;
                return newState;
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                const result = await makeRequest();
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.user.username = result.data.username;
                    newState.user.email = result.data.email;
                    newState.user.image_url = result.data.image_url;
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
        <div className="ProfilePage">

            <div className="container d-flex">
                <div className="UserNavbar">
                    <ul>
                        <li><Link to="/identity/profile">Account Overview</Link></li>
                        <li><Link to="/identity/logout">Logout</Link></li>
                    </ul>
                </div>

                <div className="UserPanel">
                    <div className="user-panel_head">Account Overview</div>
                    <div className="user-panel_body">
                        <div className="AccountOverview">
                            <div className="user-container">
                                <img className="user-container__avatar" loading="lazy" src={state.user.image_url}
                                    alt={state.user.username} />
                            </div>
                            <div className="user-content">
                                <div>Username: {state.user.username}</div>
                                <div>Email: {state.user.email}</div>
                                <div>Avatar: {state.user.image_url}</div>
                                <br />
                                <form id="profile__form" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <legend>Modify:</legend>
                                        <div className="d-flex justify-space-between">
                                            <label htmlFor="username" className="profile-label">Change Username:</label>
                                            <input name="username" type="text" id="username" defaultValue={state.user.username} />
                                        </div>
                                        <br />
                                        <div className="d-flex justify-space-between">
                                            <label htmlFor="email" className="profile-label">Change Email:</label>
                                            <input name="email" type="text" id="email" defaultValue={state.user.email} />
                                        </div>
                                        <br />
                                        <div className="d-flex justify-space-between">
                                            <label htmlFor="image_url" className="profile-label">Change Avatar:</label>
                                            <input name="image_url" type="text" id="image_url" defaultValue={state.user.image_url} />
                                        </div>
                                    </fieldset>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage;