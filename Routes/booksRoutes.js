const express = require('express');
const router = express.Router()

router.get('/all', (req, res) => {
    res.json('all books')
})
router.get('/new', (req, res) => {
    res.json('add new book')
})
router.post('/new', (req, res) => {
    res.json(' book created')
})
router.put('/:id', (req, res) => {
    res.json('book is updated')
})
router.delete('/:id', (req, res) => {
    res.json('book is deleted')
})


module.exports = router
