const sequelize = require('../config/connection')
const userData = require('./userData');
const commentData = require('./commentData');
const postData = require('./PostData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await userData();

    await postData();

    await commentData();

    process.exit(0)
};

seedAll();