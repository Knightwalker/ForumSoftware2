import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewTopicPage.css";

// Services, Hooks
import { useGetById } from "../../../services/TopicService";

const ViewTopicPage = () => {
    const [state, setState] = useState({
        topic: {
            name: "",
            posts: []
        }
    });
    const { topic_id } = useParams();
    const [makeRequest] = useGetById();

    // ComponentDidMount
    useEffect(() => {
        const componentDidMount = async () => {
            try {
                const result = await makeRequest(topic_id);
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.topic.name = result.data.name;
                    return newState;
                })
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        componentDidMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenPage_DeleteTopicPage = () => {

    }

    const handleOpenPage_EditTopicPage = () => {

    }

    const handleOpenPage_CreatePostPage = () => {

    }

    return (
        <div className="ViewTopicPage">
            <div className="topic">
                <div className="topic-page__topic-head">{state.topic.name}</div>
                <div className="topic-page__topic-body">

                    {state.topic.posts.map((post) => (
                        <div className="topic-page__post">
                            <div className="topic-page__post-row">
                                <div className="user-container">
                                    <img loading="lazy" src={post.user.imageUrl} alt={post.user.userName} />
                                    <div>{post.user.userName}</div>
                                </div>
                                <div className="post__main">
                                    <div className="post__head">
                                        <div>
                                            <p>{post.name}</p>
                                            <p>by {post.user.userName} on {post.createdOnDate}</p>
                                        </div>
                                    </div>
                                    <div className="post__body">{post.content}</div>
                                </div>
                            </div>
                            <div className="topic-page__post-foot">
                                {/* <a [routerLink]="['/posts/edit/', post.id]"><img src="/assets/btn_edit.png" alt="edit"/></a> */}
                                {/* <a [routerLink]="['/posts/delete/', post.id]"><img src="/assets/btn_delete.png" alt="delete"/></a> */}
                            </div>
                        </div>
                    ))}

                </div>
                <div className="topic-page__topic-foot">
                    <button type="button" className="btn btn-outline-dark" onClick={handleOpenPage_DeleteTopicPage}>Delete Topic</button>
                    <button type="button" className="btn btn-outline-dark ms-1" onClick={handleOpenPage_EditTopicPage}>Edit Topic</button>
                    <button type="button" className="btn btn-outline-dark ms-1" onClick={handleOpenPage_CreatePostPage}>New Post</button>
                </div>

            </div>

        </div>
    )
}

export default ViewTopicPage;