const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');

// handles routes from controllers/index
const routes = require('./controllers');
// access sequelize
const sequelize = require('./config/connection')

// declare express app 
const app = express();
const PORT = process.env.PORT || 3001;

// handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes)

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
})
