const test = require('tape')
const add = require('../functions/add')

// test('timing test', t => {
//   t.plan(2)
//
//   t.equal(typeof Date.now, 'function')
//   let start = Date.now()
//
//   setTimeout(() => {
//     t.equal(Date.now() - start, 100)
//     // t.equal(true, true)
//   }, 100)
// })

test('testing add function', t => {
  t.plan(2)
  // arrange
  let five = 5
  let two = 2
  let one = 1
  let seven = null
  let three = null

  // act
  seven = add(five, two)
  three = add(two, one)

  // assert
  t.equal(seven, 7, 'should be seven')
  t.equal(three, 3, 'should be three')
})
