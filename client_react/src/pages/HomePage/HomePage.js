import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

// Services, Hooks
import { useGetAll } from "../../services/ForumService";

const HomePage = () => {
    const [state, setState] = useState({
        status: "INIT",
        forums: []
    });
    const [makeRequest] = useGetAll();

    useEffect(() => {
        async function componentDidMount() {
            try {
                const result = await makeRequest();
                console.log(result);
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.status = "SUCCESS";
                    newState.forums = result.data;
                    return newState;
                });
            } catch (error) {
                console.log(error);
            }
        }
        componentDidMount();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="HomePage">
            {state.status === "SUCCESS" && (
                <div className="forums">
                    {state.forums.map((forum) => (
                        <div key={forum.id} className="forum container-parent">
                            <div className="container-parent__name">{forum.name}</div>
                            <div className="container-parent__body">

                                {forum.children.map((child) => (
                                    <div key={child.id} className="forum container-child">
                                        <div>
                                            <img src="https://i.servimg.com/u/f39/13/74/09/43/old10.png" alt="" />
                                        </div>
                                        <div>
                                            <img className="forum__img" src={child.image_url} alt="" />
                                        </div>
                                        <div className="forum__item3">
                                            <Link to={`/forums/read/${child.id}`}>
                                                <div className="forum__name">{child.name}</div>
                                            </Link>
                                            <div className="forum__description">{child.description}</div>
                                        </div>
                                        <div className="forum__item4">
                                            <p className="forum__stats-number">0</p>
                                            {/* <p className="forum__stats-number">{child.topics.length}</p> */}
                                            <p className="forum__stats-text">Topics</p>
                                        </div>
                                        <div className="forum__item5">
                                            <p className="forum__stats-number">0</p>
                                            {/* <p className="forum__stats-number">{child.topics.length}</p> */}
                                            <p className="forum__stats-text">Replies</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))}
                </div >
            )}

        </div >
    )
}

export default HomePage;