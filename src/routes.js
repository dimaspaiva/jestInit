const routes = require('express').Router()
const auth = require('./app/middlewares/auth')

const SessionController = require('./app/controllers/SessionController')

routes.post('/sessions', SessionController.store)

routes.use(auth)

routes.get('/dashboard', (req, res) => res.status(200).send())

module.exports = routes
