import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./ViewForumPage.css";
import { 
    urlCreateNewTopic,
    urlEditForum,
    urlDeleteForum
} from "../../../routes/endpoints";

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
    
    const handleOpenPage_CreateTopicPage = () => {
        const url = urlCreateNewTopic(forum_id);
        hookNavigate(url);
    };
    
    const handleOpenPage_EditForumPage = () => {
        const url = urlEditForum(forum_id);
        hookNavigate(url);
    }

    const handleOpenPage_DeleteForumPage = () => {
        const url = urlDeleteForum(forum_id);
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
                                    <p>{topic.posts.length} Replies</p>
                                    <p>{topic.posts.length} Views</p>
                                </div>
                                <div className="container-topic__item4">Created By: {topic.user.username}</div>
                            </div>
                        ))}

                    </div>
                    <div className="container-forum__foot">
                        <button type="button" className="btn btn-outline-dark" onClick={handleOpenPage_DeleteForumPage}>Delete Forum</button>
                        <button type="button" className="btn btn-outline-dark ms-1" onClick={handleOpenPage_EditForumPage}>Edit Forum</button>
                        <button type="button" className="btn btn-outline-dark ms-1" onClick={handleOpenPage_CreateTopicPage}>New Topic</button>
                    </div>

                </div>
            )}

        </div>
    )
}

export default ViewForumPage;