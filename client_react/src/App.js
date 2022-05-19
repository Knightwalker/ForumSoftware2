import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import './App.css';

// Pages, Containers, Components
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
    return (
        <div className="App">
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/register" element={<RegisterPage/>} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="*" element={<div>NOT FOUND PAGE</div>} />
                    </Routes>
                </MainLayout>
            </Router>
        </div>
    );
}

export default App;
