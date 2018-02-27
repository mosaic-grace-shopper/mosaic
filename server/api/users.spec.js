/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    it('GET /api/users/1', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.be.equal(codysEmail)
        })
    })

    it('PUT /api/users/make-admin/1', () => {
      return request(app)
        .put('/api/users/make-admin/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.isAdmin).to.be.equal(true)
        })
    })

    it('DELETE /api/users/1', () => {
      return request(app)
        .delete('/api/users/1')
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.status).to.be.equal(202)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
