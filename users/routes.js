const express = require('express')

const User = require('./model')

const router = express.Router()

router.get('/users', (req, res, next) => {
  User.find({})
    .then(users => {
      res.json({users})
    })
    .catch(next)
})

router.get('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.json({user})
      } else {
        next()
      }
    })
    .catch(next)
})

router.post('/users', (req, res, next) => {
  new User(req.body.user)
    .save()
    .then(user => {
      res.json({user})
    })
    .catch(next)
})

router.put('/users/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body.user, {new: true})
    .then(updatedUser => {
      res.json({user: updatedUser})
    })
    .catch(next)
})

router.delete('/users/:id', (req, res, next) => {
  User.remove({_id: req.params.id})
    .then(() => {
      res.json({message: 'User removed'})
    })
    .catch(next)
})

module.exports = router
