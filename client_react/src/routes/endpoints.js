const urlViewForum = (forum_id) => { return `/forums/read/${forum_id}`; }
const urlEditForum = (forum_id) => { return `/forums/edit/${forum_id}`; }
const urlCreateNewTopic = (forum_id) => { return `/forums/create/new_topic/${forum_id}`; }

export {
    urlViewForum,
    urlEditForum,
    urlCreateNewTopic
}