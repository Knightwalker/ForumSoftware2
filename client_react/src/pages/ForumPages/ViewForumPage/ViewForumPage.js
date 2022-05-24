import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { urlCreateNewTopic } from "../../../routes/endpoints";
import "./ViewForumPage.css";

// Services, Hooks
import { useGetById } from "../../../services/ForumService";

const ViewForumPage = () => {
    const [state, setState] = useState({
        status: "INIT",
        forum: {}
    });
    const { forum_id } = useParams();
    const hookNavigate = useNavigate();
    const [makeRequest] = useGetById();

    useEffect(() => {
        async function componentDidMount() {
            try {
                const result = await makeRequest(forum_id);
                console.log(result);
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.status = "SUCCESS";
                    newState.forum = result.data;
                    return newState;
                });
            } catch (error) {
                console.log(error);
            }
        }
        componentDidMount();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenCreateNewTopic = () => {
        const url = urlCreateNewTopic(forum_id);
        hookNavigate(url);
    }

    return (
        <div className="ViewForumPage">

            {state.status === "SUCCESS" && (
                <div className="container-forum">
                    <div className="container-forum__head">{state.forum.name}</div>
                    <div className="container-forum__body">

                        {state.forum.topics.map((topic) => (
                            <div key={topic.id} className="container-topic">
                                <div className="container-topic__item1">
                                    <img src="https://i.servimg.com/u/f39/13/74/09/43/old10.png" alt="" />
                                </div>
                                <div className="container-topic__item2">
                                    <Link to={`/topics/read/${topic.id}`}>
                                        <p>{topic.name}</p>
                                    </Link>
                                    <div className="topic__author">{topic.description}</div>
                                </div>
                                <div className="container-topic__item3">
                                    <p>10 Replies WIP</p>
                                    <p>10 VIew WIP</p>
                                    {/* <p>{topic.posts.length} Replies</p>
                                    <p>{topic.posts.length} Views</p> */}
                                </div>
                                <div className="container-topic__item4">Created By: {topic.user_id}</div>
                            </div>
                        ))}

                    </div>
                    <div className="container-forum__foot">
                        <button type="button">Delete Forum</button>
                        <button type="button">Edit Forum</button>
                        <button type="button" onClick={handleOpenCreateNewTopic}>New Topic</button>
                    </div>

                </div>
            )}

        </div>
    )
}

export default ViewForumPage;