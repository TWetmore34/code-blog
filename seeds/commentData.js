const { Comment } = require('../models')

const comments = [
    {
        "content": "Wow! I love!!",
        "user_id": 1,
        "post_id": 4
    },{
        "content": "This stinks!! and so do u",
        "user_id": 3,
        "post_id": 4
    },{
        "content": "Wowza Powza",
        "user_id": 2,
        "post_id": 2
    },{
        "content": "HEHEHOHO",
        "user_id": 4,
        "post_id": 1
    }
]

function seedComments () {
    return Comment.bulkCreate(comments)
}

module.exports = seedComments;