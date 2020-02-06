const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'invalid token' })
  }

  const [tag, token] = authHeader.split(' ')

  if (tag !== 'Bearer') {
    return res.status(401).json({ message: 'invalid token' })
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    req.userId = decoded.id

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'invalid token' })
  }
}
