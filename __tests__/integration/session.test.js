const request = require('supertest')

const app = require('../../src/app')
const userFactory = require('../utils/userFactory')
const truncate = require('../utils/truncate')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await userFactory()

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password
      })

    expect(response.status).toBe(200)
  })

  it('shouldnt authenticate with invalid email', async () => {
    const user = await userFactory()

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'dimaslaa@gmail.com',
        password: '123321'
      })

    expect(response.status).toBe(401)
  })

  it('shouldnt authenticate with invalid password', async () => {
    const user = await userFactory()

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '654321'
      })

    expect(response.status).toBe(401)
  })

  it('should receive JWT toke', async () => {
    const user = await userFactory()

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should access restricted area', async () => {
    const user = await userFactory()

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('shouldnt access restricted area, without token', async () => {
    const response = await request(app).get('/dashboard')

    expect(response.status).toBe(401)
  })

  it('shoudnt access restricted area, with invalid token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('authorization', 'Bearer 1ini4n230n')

    expect(response.status).toBe(401)
  })

  it('shouldnt access restricted area, with wrong token', async () => {
    const user = await userFactory()

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `${user.generateToken()}`)

    expect(response.status).toBe(401)
  })
})
