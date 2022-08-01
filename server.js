// npm package imports
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// handles routes from controllers/index
const routes = require('./controllers');
// access sequelize
const sequelize = require('./config/connection')

// sequelize store declaration
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// cookie setup
const sess = {
    secret: 'secrets secrets are no fun',
    cookie: {
    maxAge: 600000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
      })
}

// declare express app 
const app = express();
const PORT = process.env.PORT || 3001;

// use session middleware
app.use(session(sess));

// handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes)

// server start
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
});

module.exports = sess;