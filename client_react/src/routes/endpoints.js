const urlViewForum = (forum_id) => { return `/forums/read/${forum_id}`; }
const urlEditForum = (forum_id) => { return `/forums/edit/${forum_id}`; }
const urlDeleteForum = (forum_id) => { return `/forums/delete/${forum_id}`; }
const urlCreateNewTopic = (forum_id) => { return `/forums/create/new_topic/${forum_id}`; }
const urlEditTopic = (topic_id) => { return `/topics/edit/${topic_id}`; }
const urlDeleteTopic = (topic_id) => { return `/topics/delete/${topic_id}`; }
const urlCreateNewPost = (topic_id) => { return `/topics/create/new_post/${topic_id}`; }
const urlViewTopic = (topic_id) => { return `/topics/read/${topic_id}`; }

export {
    urlViewForum,
    urlViewTopic,
    urlEditForum,
    urlDeleteForum,
    urlCreateNewTopic,
    urlEditTopic,
    urlDeleteTopic,
    urlCreateNewPost
}