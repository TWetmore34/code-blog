const { User } = require('../models');

let users = [
    {
        name: 'maxie',
        password: 'asdfjwenrgc'
    },{
        name: 'james',
        password: 'asdfwetsfd'
    },{
        name: 'hellowiowie',
        password: 'asdwfafsefrea'
    },{
        name: 'heyo!!',
        password: 'asdfasdfwrbt3'
    },
];

function userCreate () {
    return User.bulkCreate(users)
};

module.exports = userCreate;