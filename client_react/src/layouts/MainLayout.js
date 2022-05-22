import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./MainLayout.css";

const MainLayout = (props) => {
    const { user } = useContext(AppContext);

    return (
        <div className="MainLayout">
            <header>
                <nav className="navbar">
                    <div className="navbar__left">
                        <Link to="/"><div className="nav__logo2"></div></Link>
                    </div>
                    <div className="navbar__mid">
                        <ul className="nav__list">
                            <li><Link to="/users"><div className="nav__item">User</div></Link></li>
                            <li><Link to="/groups"><div className="nav__item">Groups</div></Link></li>
                            <li><Link to="/forum/create"><div className="nav__item">Create Forum</div></Link></li>
                        </ul>
                    </div>
                    <div className="navbar__right">
                        <ul className="nav__list">
                            {!user.isLoggedIn && (
                                <>
                                    <li><Link to="/identity/login"><div className="nav__item">Login</div></Link></li>
                                    <li><Link to="/identity/register"><div className="nav__item">Register</div></Link></li>
                                </>
                            )}
                            {user.isLoggedIn && (
                                <>
                                    <li><Link to="/profile"><div className="nav__item">Welcome, {user.username}</div></Link></li>
                                    <li><Link to="/identity/logout"><div className="nav__item">Logout</div></Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
                <div className="hero"></div>
            </header>
            <div className="container flex-grow-1 py-4">
                <main>
                    {props.children}
                </main>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-item1">
                        <h5 className="text-uppercase">Forum Software</h5>

                        <p>
                            This Forum is a free React powered flat-forum bulletin board software solution that can be used to
                            stay in touch with a group of people or can power your entire website.
                        </p>
                    </div>

                    <div className="footer-item2">
                        <h5 className="text-uppercase">Links</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                                <a href="https://github.com/Knightwalker/ForumSoftware2" className="text-white">Overview</a>
                            </li>
                            <li>
                                <a href="https://github.com/Knightwalker/ForumSoftware2" className="text-white">Technology</a>
                            </li>
                            <li>
                                <a href="https://github.com/Knightwalker/ForumSoftware2" className="text-white">Github</a>
                            </li>
                            <li>
                                <a href="https://github.com/Knightwalker/ForumSoftware2" className="text-white">Docs</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-item3">
                        <h5 className="text-uppercase mb-0">About</h5>

                        <ul className="list-unstyled">
                            <li>
                                <a href="https://github.com/Knightwalker/ForumSoftware2" className="text-white">Team</a>
                            </li>
                            <li>
                                <a href="https://github.com/Knightwalker/ForumSoftware2" className="text-white">Community</a>
                            </li>
                            <li>
                                <a href="https://github.com/Knightwalker/ForumSoftware2" className="text-white">Support</a>
                            </li>
                            <li>
                                <a href="https://github.com/Knightwalker/ForumSoftware2" className="text-white">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">Made with &hearts; by Knightwalker</div>
            </footer>
        </div>
    )
}

export default MainLayout;