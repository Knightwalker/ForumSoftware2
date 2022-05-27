import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./ViewTopicPage.css";
import {
    urlCreateNewPost
} from "../../../routes/endpoints";

// Assets
import BtnEditImg from "../../../assets/btn_edit.png";
import BtnDeleteImg from "../../../assets/btn_delete.png";

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
    const hookNavigate = useNavigate();
    const [makeRequest] = useGetById();

    // ComponentDidMount
    useEffect(() => {
        const componentDidMount = async () => {
            try {
                const result = await makeRequest(topic_id);
                setState((oldState) => {
                    const newState = JSON.parse(JSON.stringify(oldState));
                    newState.topic.name = result.data.name;
                    newState.topic.posts = result.data.posts;
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
        const url = urlCreateNewPost(topic_id);
        hookNavigate(url);
    }

    return (
        <div className="ViewTopicPage">
            <div className="topic-page__topic-head">{state.topic.name}</div>
            <div className="topic-page__topic-body">

                {state.topic.posts.map((post) => (
                    <div key={post.id} className="topic-page__post">
                        <div className="topic-page__post-row">
                            <div className="user-container">
                                <img loading="lazy" src={post.user.image_url} alt={post.user.username} />
                                <div>{post.user.username}</div>
                            </div>
                            <div className="post__main">
                                <div className="post__head">
                                    <div>
                                        <p>{post.name}</p>
                                        <p>by {post.user.username} on {post.created_at}</p>
                                    </div>
                                </div>
                                <div className="post__body">{post.content}</div>
                            </div>
                        </div>
                        <div className="topic-page__post-foot">
                            <Link to={`/posts/edit/${post.id}`}><img src={BtnEditImg} alt="edit"/></Link>
                            <Link to={`/posts/delete/${post.id}`}><img src={BtnDeleteImg} alt="delete"/></Link>
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
    )
}

export default ViewTopicPage;