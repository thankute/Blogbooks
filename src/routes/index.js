const siteRouter = require('./site')
const authRouter = require('./auth')
const meRouter = require('./me')
const userRouter = require('./user')

function route(app) {
    app.use('/auth', authRouter)
    app.use('/me', meRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route
