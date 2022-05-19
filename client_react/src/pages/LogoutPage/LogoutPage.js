import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./LogoutPage.css";

const LogoutPage = () => {
    const hookNavigate = useNavigate();
    const { setUser } = useContext(AppContext);

    const handleLogout = () => {
        setUser({
            isLoggedIn: false,
            username: "",
            token: null
        });
        hookNavigate("/");
    };

    const handleNevermind = () => {
        hookNavigate("/");
    };

    return (
        <div className="LogoutPage">
            <h1 className="LogoutPage__h1">Are You Sure You Want To Logout?</h1>

            <div className="LogoutPage__container">
                <button
                    type="button"
                    className="LogoutPage__btn btn btn-secondary mx-1"
                    onClick={handleNevermind}
                >
                    Nevermind
                </button>
                <button
                    type="button"
                    className="LogoutPage__btn btn btn-primary mx-1"
                    onClick={handleLogout}
                >
                    Yes
                </button>
            </div>

        </div>
    );
}

export default LogoutPage;