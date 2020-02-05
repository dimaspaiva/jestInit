const routes = require('express').Router()
const { User } = require('./models')

User.create({
  name: 'Dimas',
  email: 'dimasalpaiva@gmail.com',
  passwordHash: 'asdmfoinqru234321e0ir34oi!'
})

// Set routes

module.exports = routes
