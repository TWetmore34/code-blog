const moment = require('moment')
// format time and date with moment
module.exports = {
    dateTime: (time) => {
        return moment(time).format('MMMM Do YY')
    },
    compareId: ((id1, id2) => {
        if(id1 === id2) {
            return true
        } else {
            return false
        }
    })

};