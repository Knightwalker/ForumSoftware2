import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const hookNavigate = useNavigate();

    const [hasErrors, setHasErrors] = useState(false);
    const [arrErrors, setArrErrors] = useState([]);

    const fOnSubmit = async (e) => {
        e.preventDefault();
        const formData = document.forms["register__form"].elements;
        const username = formData["username"].value;
        const password = formData["password"].value;

        const data = {
            username: username,
            password: password,
        }

        var result = null;
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            result = await response.json();

            if (result.status === "failed") {
                setHasErrors(true);
                setArrErrors(result.arrErrors);
                return;
            }

            setHasErrors(false);
            setArrErrors([]);

        } catch (error) {
            console.log(error);
        }

        // Verify Token
        // var token = null;
        // try {
        //     token = jwt.verify(result.token, "keyboard cats");
        // } catch (error) {
        //     console.log(error);
        // }

        hookNavigate.push("/");
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
            <div className="register__h1">Log Inside Your Account</div>

            {(hasErrors) && (
                <div className="LoginPage__errors-container">
                    {arrErrors.map((error, i) =>
                        <div key={i}>{error.message}</div>
                    )}
                </div>
            )}

            <div className="register__container">
                <form id="register__form" autoComplete="off" onSubmit={fOnSubmit}>
                    <div className="register__grid">
                        <div className="register__grid_icon"><img src="/assets/auth/username.png" alt=""></img></div>
                        <label className="register__grid_label">Username</label>
                        <input className="register__grid_input" type="text" name="username"
                            onFocus={fOnFocusInFocusOutVisuals.bind(this, "username", "focusin")}
                            onBlur={fOnFocusInFocusOutVisuals.bind(this, "username", "focusout")}
                        />
                        <div className="register__grid_error"></div>
                    </div>

                    <div className="register__grid">
                        <div className="register__grid_icon"><img src="/assets/auth/shield.png" alt="shield"></img></div>
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