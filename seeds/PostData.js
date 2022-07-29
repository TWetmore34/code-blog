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
        title: 'Im so tried of writing posts',
        post_content: 'but wow im so good at testing things!',
        user_id: 3
    },{
        title: 'heyo!! howza wowza going',
        post_content: 'meesa very tired',
        user_id: 4
    },
];

function postData () {
    return Post.bulkCreate(posts)
};

module.exports = postData;