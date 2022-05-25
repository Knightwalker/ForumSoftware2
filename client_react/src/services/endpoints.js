const BASE_URL = "http://localhost:8000";

const URL_POST_REGISTER = "http://localhost:8000/api/identity/register";
const URL_POST_LOGIN = "http://localhost:8000/api/identity/login";
const URL_POST_LOGOUT = "http://localhost:8000/api/identity/logout";

const URL_FORUMS_GET_ALL = "http://localhost:8000/api/forums/getall";
const URL_FORUMS_CREATE = `${BASE_URL}/api/forums/create`;
const URL_FORUMS_GET_BY_ID = (forum_id) => `${BASE_URL}/api/forums/getbyid/${forum_id}`;
const URL_FORUMS_UPDATE_BY_ID = (forum_id) => `${BASE_URL}/api/forums/updatebyid/${forum_id}`;
const URL_FORUMS_DELETE_BY_ID = (forum_id) => `${BASE_URL}/api/forums/deletebyid/${forum_id}`;

const URL_TOPIC_CREATE = `${BASE_URL}/api/topics/create`;

export {
    URL_POST_REGISTER,
    URL_POST_LOGIN,
    URL_POST_LOGOUT,

    URL_FORUMS_GET_ALL,
    URL_FORUMS_CREATE,
    URL_FORUMS_GET_BY_ID,
    URL_FORUMS_UPDATE_BY_ID,
    URL_FORUMS_DELETE_BY_ID,

    URL_TOPIC_CREATE
}