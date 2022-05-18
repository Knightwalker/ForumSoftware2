import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import UsernameImg from "../../assets/auth/username.png";
import ShieldImg from "../../assets/auth/shield.png";
import PaperImg from "../../assets/auth/paper.png";

// Services, Hooks
import { useRegister } from "../../services";

const RegisterPage = () => {
    const [hasErrors, setHasErrors] = useState(false);
    const [arrErrors, setArrErrors] = useState([]);
    const hookNavigate = useNavigate();
    const [makeRequest] = useRegister();

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        const formData = document.forms["RegisterPage__form"].elements;
        const username = formData["username"].value;
        const password = formData["password"].value;
        const passwordRe = formData["passwordRe"].value;
        const email = formData["email"].value;
        const verify_age = formData["verify_age"].checked;
        const verify_tos = formData["verify_tos"].checked;

        const payload = {
            username: username,
            password: password,
            passwordRe: passwordRe,
            email: email,
            verify_age: verify_age,
            verify_tos: verify_tos
        };

        try {
            const result = await makeRequest(payload);
            debugger;
            if (result.status === "failed") {
                setHasErrors(true);
                setArrErrors(result.arrErrors);
                return;
            }

            setHasErrors(false);
            setArrErrors([]);
            hookNavigate.push("/");

        } catch (error) {
            console.log(error);
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
        <div className="RegisterPage">

            <div className="register__h1">Create Your Account</div>

            {(hasErrors) ? (<div className="login__errors-container">
                {arrErrors.map((error, i) =>
                    <div key={i}>{error.message}</div>
                )}
            </div>) : (null)}

            <div className="register__container">
                <form id="RegisterPage__form" autoComplete="off" onSubmit={handleSubmit}>

                    <div className="register__grid">
                        <div className="register__grid_icon">
                            <img src={UsernameImg} alt=""></img>
                        </div>
                        <label className="register__grid_label">Username</label>
                        <input className="register__grid_input" type="text" name="username"
                            onFocus={fOnFocusInFocusOutVisuals.bind(this, "username", "focusin")}
                            onBlur={fOnFocusInFocusOutVisuals.bind(this, "username", "focusout")}
                        />
                        <div className="register__grid_error"></div>
                    </div>

                    <div className="register__grid">
                        <div className="register__grid_icon">
                            <img src={ShieldImg} alt="shield"></img>
                        </div>
                        <label className="register__grid_label">Password</label>
                        <input className="register__grid_input" type="password" name="password"
                            onFocus={fOnFocusInFocusOutVisuals.bind(this, "password", "focusin")}
                            onBlur={fOnFocusInFocusOutVisuals.bind(this, "password", "focusout")}
                        />
                        <div className="register__grid_error"></div>
                    </div>

                    <div className="register__grid">
                        <div className="register__grid_icon">
                            <img src={PaperImg} alt="shield"></img>
                        </div>
                        <label className="register__grid_label">Confirm Password</label>
                        <input className="register__grid_input" type="password" name="passwordRe"
                            onFocus={fOnFocusInFocusOutVisuals.bind(this, "passwordre", "focusin")}
                            onBlur={fOnFocusInFocusOutVisuals.bind(this, "passwordre", "focusout")}
                        />
                        <div className="register__grid_error"></div>
                    </div>

                    <div className="register__grid">
                        <div className="register__grid_icon">
                            <img src={PaperImg} alt="post"></img>
                        </div>
                        <label className="register__grid_label">Email</label>
                        <input className="register__grid_input" type="text" name="email"
                            onFocus={fOnFocusInFocusOutVisuals.bind(this, "email", "focusin")}
                            onBlur={fOnFocusInFocusOutVisuals.bind(this, "email", "focusout")}
                        />
                        <div className="register__grid_error"></div>
                    </div>

                    <div className="register__normalbox">
                        <div className="RegisterPage__input-checkbox-container">
                            <input id="verify_age" type="checkbox" name="verify_age" />
                            <label htmlFor="verify_age">I am over 18 years of age.</label>
                        </div>
                        <div className="RegisterPage__input-checkbox-container">
                            <input id="verify_tos" type="checkbox" name="verify_tos" />
                            <label htmlFor="verify_tos">I agree to the <a href="/">Terms and Conditions.</a></label>
                        </div>
                        <br />
                        <p>*An email confirmation will be sent to this address to verify it before you can log in.</p>
                    </div>

                    <input className="register__form_button" type="submit" name="register_form" value="register" />
                    <hr className="register__hr"></hr>

                    <div>
                        <p>Already have an account?</p>
                        <p className="register__block"><Link to="/auth/login">Login</Link> or <Link to="/">Reset Password</Link></p>
                    </div>

                </form>
            </div>


        </div>
    )
}

export default RegisterPage;