const moment = require('moment')

module.exports = {
    dateTime: (time) => {
        return moment(time).format('MMMM Do YY')
    }
};