const { Post } = require('../models');

let posts = [
    {
        title: 'WHAAAAAAT???!!!??',
        post_content: 'HOW DOES THIS WORK????????!!!!',
        user_id: 1
    },{
        title: 'Community',
        post_content: 'da dum dado da dum bum bum',
        user_id: 2
    },{
        title: 'These are some fascinating posts here!',
        post_content: 'and wow im so good at testing things now!',
        user_id: 3
    },{
        title: 'heyo!! howza wowza going',
        post_content: 'I am become sleepy, the goer to bed',
        user_id: 4
    },
];

function postData () {
    return Post.bulkCreate(posts)
};

module.exports = postData;