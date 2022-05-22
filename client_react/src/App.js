import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import './App.css';

// Pages, Containers, Components
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import Protected from "./routes/Protected";
import Error403Page from "./pages/ErrorPages/Error403Page";

// Enums
import { ENUM_USER_ROLES } from "./enums";

function App() {
    return (
        <div className="App">
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/identity/register" element={<RegisterPage />} />
                        <Route path="/identity/login" element={<LoginPage />} />
                        <Route path="/identity/logout" element={<LogoutPage />} />
                        <Route path="/forum/create" element={
                            <Protected authorizedFor={ENUM_USER_ROLES.ADMIN}>
                                <div>Forum Create</div>
                            </Protected>
                        } />
                        <Route path="/error/403" element={<Error403Page />} />
                        <Route path="*" element={<div>NOT FOUND PAGE</div>} />
                    </Routes>
                </MainLayout>
            </Router>
        </div>
    );
}

export default App;
