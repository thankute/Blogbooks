const express = require("express")
const routes = require("./routes/index")
const path = require('path')
const session = require('express-session')
const db = require("./config/db/index")
const methodOverride = require('method-override')
const {engine} = require('express-handlebars')
const hbs = require('handlebars')
const PORT = process.env.PORT || 5000
const app = express()

// method-override
app.use(methodOverride('_method'));

// middlware
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'thanhkute',
    resave: true,
    saveUninitialized: false
}));
app.use('/uploads', express.static(__dirname +'/uploads'));
app.use(express.static(path.join(__dirname, 'public')))

// handlebars
const { when, equal } = require('./helper/hbs')
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: {
        equal
    }
}));
app.set('view engine', '.hbs');
app.set('views', './src/views');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'))


// routes
routes(app)

// database
db.connect()

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
