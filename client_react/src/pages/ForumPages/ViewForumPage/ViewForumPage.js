import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ViewForumPage.css";

const ViewForumPage = () => {
    const [state, setState] = useState({
        status: "INIT",
        forum: {}
    });

    useEffect(() => {
        // async function componentDidMount() {
        //     try {
        //         const result = await makeRequest();
        //         console.log(result);
        //         setState((oldState) => {
        //             const newState = JSON.parse(JSON.stringify(oldState));
        //             newState.status = "SUCCESS";
        //             newState.forums = result.data;
        //             return newState;
        //         });
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // componentDidMount();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="ViewForumPage">

            {state.status === "SUCCESS" && (
                <div class="forums-list">

                    <div class="container-forum">
                        <div class="container-forum__head">{state.forum.name}</div>
                        <div class="container-forum__body">

                            {state.forum.topics.map((topic) => (
                                <div key={topic.id} class="container-topic">
                                    <div class="container-topic__item1">
                                        <img src="https://i.servimg.com/u/f39/13/74/09/43/old10.png" alt="" />
                                    </div>
                                    <div class="container-topic__item2">
                                        <Link to={`/topics/read/${topic.id}`}>
                                            <p>{topic.name}</p>
                                        </Link>
                                        <div class="topic__author">{topic.description}</div>
                                    </div>
                                    <div class="container-topic__item3">
                                        {/* <p>{topic.posts.length} Replies</p>
                                    <p>{topic.posts.length} Views</p> */}
                                    </div>
                                    <div class="container-topic__item4">Created By: {topic.user.userName}</div>
                                </div>
                            ))}

                        </div>
                        {/* <div class="container-forum__foot">
                        <button mat-button [routerLink]="urlForForumsDelete">Delete Forum</button>
                        <button mat-button [routerLink]="urlForForumsEdit">Edit Forum</button>
                        <button mat-button [routerLink]="urlForTopicsCreate">New Topic</button>
                    </div> */}

                    </div>

                </div>
            )}

        </div>
    )
}

export default ViewForumPage;