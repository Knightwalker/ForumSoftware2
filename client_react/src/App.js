import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import './App.css';

// Pages, Containers, Components
import HomePage from "./pages/home/HomePage/HomePage";
import UsersPage from "./pages/home/UsersPage/UsersPage";
import RegisterPage from "./pages/identity/RegisterPage/RegisterPage";
import LoginPage from "./pages/identity/LoginPage/LoginPage";
import LogoutPage from "./pages/identity/LogoutPage/LogoutPage";
import ProfilePage from "./pages/identity/ProfilePage/ProfilePage";
import CreateForumPage from "./pages/forum/CreateForumPage/CreateForumPage";
import ViewForumPage from "./pages/forum/ViewForumPage/ViewForumPage";
import CreateTopicPage from "./pages/forum/CreateTopicPage/CreateTopicPage";
import EditForumPage from "./pages/forum/EditForumPage/EditForumPage";
import DeleteForumPage from "./pages/forum/DeleteForumPage/DeleteForumPage";
import Protected from "./routes/Protected";

// Enums
import { ENUM_USER_ROLES } from "./enums";
import ViewTopicPage from "./pages/forum/ViewTopicPage/ViewTopicPage";
import CreatePostPage from "./pages/forum/CreatePostPage/CreatePostPage";
import EditTopicPage from "./pages/forum/EditTopicPage/EditTopicPage";
import DeleteTopicPage from "./pages/forum/DeleteTopicPage/DeleteTopicPage";
import EditPostPage from "./pages/forum/EditPostPage/EditPostPage";
import DeletePostPage from "./pages/forum/DeletePostPage/DeletePostPage";
import Error404NotFoundPage from "./pages/ErrorPages/Error404NotFoundPage/Error404NotFoundPage";
import Error403NotAuthorizedPage from "./pages/ErrorPages/Error403NotAuthorizedPage/Error403NotAuthorizedPage";

function App() {

    return (
        <div className="App">
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/identity/register" element={<RegisterPage />} />
                        <Route path="/identity/login" element={<LoginPage />} />
                        <Route path="/identity/logout" element={<LogoutPage />} />
                        <Route path="/identity/profile" element={<ProfilePage />} />
                        <Route path="/forums/read/:forum_id" element={<ViewForumPage />} />
                        <Route path="/topics/read/:topic_id" element={<ViewTopicPage />} />
                        <Route path="/forum/create" element={
                            <Protected authorizedFor={ENUM_USER_ROLES.ADMIN}>
                                <CreateForumPage />
                            </Protected>
                        } />
                        <Route path="/forums/create/new_topic/:forum_id" element={<CreateTopicPage />} />
                        <Route path="/forums/edit/:forum_id" element={<EditForumPage />} />
                        <Route path="/forums/delete/:forum_id" element={<DeleteForumPage />} />
                        <Route path="/topics/create/new_post/:topic_id" element={<CreatePostPage />} />
                        <Route path="/topics/edit/:topic_id" element={<EditTopicPage />} />
                        <Route path="/topics/delete/:topic_id" element={<DeleteTopicPage />} />
                        <Route path="/posts/edit/:post_id" element={<EditPostPage />} />
                        <Route path="/posts/delete/:post_id" element={<DeletePostPage />} />
                        <Route path="/error/403" element={<Error403NotAuthorizedPage />} />  
                        <Route path="*" element={<Error404NotFoundPage />} />
                    </Routes>
                </MainLayout>
            </Router>
        </div>
    );
}

export default App;
