const request = require('supertest')
const test = require('tape')

const app = require('../app.js')

test.onFinish(() => {
  process.exit()
})

let closure = {
  id: null
}

test('GET /users should return empty array in the beginning', t => {
  request(app)
    .get('/api/v1/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.fail(err)
        return t.end()
      }

      t.equal(res.body.users.length, 0)
      t.end()
    })
})

test('POST /users should create user', t => {
  t.plan(1)
  // arrange
  let body = {
    user: {
      name: 'Kirill',
      surname: 'Gusyatin',
      age: 12
    }
  }

  // act
  request(app)
    .post('/api/v1/users')
    .send(body)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.fail(err)
        return t.end()
      }

      let result = res.body.user
      closure.id = result._id
      delete result.__v
      delete result._id

      // assert
      t.deepEqual(result, body.user)
      t.end()
    })
})

test('PUT /users/:id should update user', t => {
  t.plan(1)
  // arrange
  let updatedInfo = {
    user: {
      age: 22
    }
  }

  // act
  request(app)
    .put('/api/v1/users/' + closure.id)
    .send(updatedInfo)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.fail(err)
        return t.end()
      }

      // assert
      t.equal(res.body.user.age, updatedInfo.user.age)
      t.end()
    })
})

test('DELETE /users/:id should remove user', t => {
  t.plan(2)
  // arrange

  // act
  request(app)
    .delete('/api/v1/users/' + closure.id)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.fail(err)
        return t.end()
      }

      // assert
      t.equal(res.body.message, 'User removed')

      request(app)
        .get('/api/v1/users/' + closure.id)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) {
            t.fail(err)
            return t.end()
          }

          // assert
          t.equal(res.status, 404)
          t.end()
        })
    })
})
