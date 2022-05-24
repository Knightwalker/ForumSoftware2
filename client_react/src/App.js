import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import './App.css';

// Pages, Containers, Components
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import CreateForumPage from "./pages/ForumPages/CreateForumPage/CreateForumPage";
import Protected from "./routes/Protected";
import Error403Page from "./pages/ErrorPages/Error403Page";

// Enums
import { ENUM_USER_ROLES } from "./enums";
import ViewForumPage from "./pages/ForumPages/ViewForumPage/ViewForumPage";
import CreateTopicPage from "./pages/forum/CreateTopicPage/CreateTopicPage";
import EditForumPage from "./pages/forum/EditForumPage/EditForumPage";

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
                        <Route path="/forums/read/:forum_id" element={<ViewForumPage />} />
                        <Route path="/forum/create" element={
                            <Protected authorizedFor={ENUM_USER_ROLES.ADMIN}>
                                <CreateForumPage />
                            </Protected>
                        } />
                        <Route path="/forums/create/new_topic/:forum_id" element={<CreateTopicPage />} />
                        <Route path="/forums/edit/:forum_id" element={<EditForumPage />} />
                        <Route path="/error/403" element={<Error403Page />} />
                        <Route path="*" element={<div>NOT FOUND PAGE</div>} />
                    </Routes>
                </MainLayout>
            </Router>
        </div>
    );
}

export default App;
