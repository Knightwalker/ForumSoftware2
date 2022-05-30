import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import UsernameImg from "../../../assets/auth/username.png";
import ShieldImg from "../../../assets/auth/shield.png";
import "./LoginPage.css";

// Services, Hooks
import { useLogin } from "../../../services/IdentityService";

const LoginPage = () => {
    const hookNavigate = useNavigate();
    const { setUser } = useContext(AppContext);
    const [makeRequest] = useLogin();

    const [hasErrors, setHasErrors] = useState(false);
    const [arrErrors, setArrErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = document.forms["LoginPage__form"].elements;
        const username = formData["username"].value;
        const password = formData["password"].value;

        const payload = {
            username: username,
            password: password,
        };

        try {
            const data = await makeRequest(payload);
            console.log(data);
            setUser((oldData) => {
                const newData = JSON.parse(JSON.stringify(oldData));
                newData.isLoggedIn = true;
                newData.username = data.user.username;
                newData.role = data.user.role;
                newData.token = data.token;
                return newData;
            });
            localStorage.setItem("LARAVEL_STORE", JSON.stringify({
                username: data.user.username,
                role: data.user.role,
                token: data.token
            }));
            hookNavigate("/");
        } catch (error) {
            setArrErrors(error.errors);
            setHasErrors(true);
        }

    }

    const fOnFocusInFocusOutVisuals = (field, mode, e) => {
        let labelEl = e.target.parentElement.children[1];
        let inputEl = e.target.parentElement.children[2];

        // BEING VISUALS - Label movement on focusin and focusout
        if (mode === "focusin") {
            labelEl.style.fontSize = "15px";
            labelEl.style.transform = "translate(-60px, -26px)";

        } else if (mode === "focusout" && inputEl.value === "") {
            labelEl.style.fontSize = "24px";
            labelEl.style.transform = "initial";
        }
        // END VISUALS - Label movement on focusin and focusout
    }

    return (
        <div className="LoginPage">
            <h1 className="LoginPage__h1">Welcome Back Hero!</h1>

            {(hasErrors) && (
                <div className="LoginPage__errors-container">
                    {arrErrors.map((error, i) =>
                        <div key={i}>{error}</div>
                    )}
                </div>
            )}

            <div className="LoginPage__container">
                <form id="LoginPage__form" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="register__grid">
                        <div className="register__grid_icon"><img src={UsernameImg} alt="username"></img></div>
                        <label className="register__grid_label">Username</label>
                        <input className="register__grid_input" type="text" name="username"
                            onFocus={fOnFocusInFocusOutVisuals.bind(this, "username", "focusin")}
                            onBlur={fOnFocusInFocusOutVisuals.bind(this, "username", "focusout")}
                        />
                        <div className="register__grid_error"></div>
                    </div>

                    <div className="register__grid">
                        <div className="register__grid_icon"><img src={ShieldImg} alt="password"></img></div>
                        <label className="register__grid_label">Password</label>
                        <input className="register__grid_input" type="password" name="password"
                            onFocus={fOnFocusInFocusOutVisuals.bind(this, "password", "focusin")}
                            onBlur={fOnFocusInFocusOutVisuals.bind(this, "password", "focusout")}
                        />
                        <div className="register__grid_error"></div>
                    </div>

                    <input className="register__form_button" type="submit" name="register_form" value="LOGIN" />
                    <hr className="register__hr" />

                    <div>
                        <p>Or login with</p>
                        <p className="register__block"><Link to="/">Facebook WIP</Link> or <Link to="/">Google WIP</Link></p>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default LoginPage;