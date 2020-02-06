const { User } = require('../../src/app/models')

module.exports = async (name, password, email) => {
  const newUser = {
    name: name || 'Dimas Paiva',
    password: password || '123321',
    email: email || 'dimasalpaiva@gmail.com'
  }
  return await User.create({ ...newUser })
}
