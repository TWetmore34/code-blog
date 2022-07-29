const { User } = require('../models');

let users = [
    {
        name: 'maxie',
        password: 'asdfjwenrgc',
        email: 'testing@gmail.com'
    },{
        name: 'james',
        password: 'asdfwetsfd',
        email: 'hello@gmail.com'

    },{
        name: 'hellowiowie',
        password: 'asdwfafsefrea',
        email: 'hehehe@gmail.com'

    },{
        name: 'heyo!!',
        password: 'asdfasdfwrbt3',
        email: 'yehaw@gmail.com'

    },
];

function userCreate () {
    return User.bulkCreate(users)
};

module.exports = userCreate;