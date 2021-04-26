const express = require('express');
const morgan = require('morgan')
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(morgan('dev'))

app.listen(5000, () => {
    console.log('listening at http:localhost:5000');
})

app.use(express.static('public'))
app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use(function (req, res, next) {
    console.log('start')
    console.log('method:', req.method)
    next()
})
app.use(function (req, res, next) {
    console.log('second')
    next()
})

function sayHi(req, res, next) {
    console.log('hi')
    next()
}
function sayHello(req, res, next) {
    console.log('hello')
    next()
}
app.get('/', sayHi, sayHello, function (req, res, next) {
    console.log('Too much')
    next()
}, (req, res, next) => {
    res.render('pages/index')
    next()
})
app.use(function (req, res, next) {
    console.log('end')
    next()
})
const blogRoutes = require('./Routes/blogsRoutes')
// ROUTE: /blogs/...
app.use('/blogs', blogRoutes)
// app.get('/blogs/all', (req, res) => {
//     res.json('all blogs')
// })
// app.get('/blogs/new', (req, res) => {
//     res.json('add new blog')
// })
// app.post('/blogs/new', (req, res) => {
//     res.json('blog created')
// })
// app.put('/blogs/:id', (req, res) => {
//     res.json('blog is updated')
// })
// app.delete('/blogs/:id', (req, res) => {
//     res.json('blog is deleted')
// })
const booksRoutes = require('./Routes/booksRoutes')
app.use('/books', booksRoutes)
// app.get('/books/all', (req, res) => {
//     res.json('all books')
// })
// app.get('/books/new', (req, res) => {
//     res.json('add new book')
// })
// app.post('/books/new', (req, res) => {
//     res.json(' book created')
// })
// app.put('/books/:id', (req, res) => {
//     res.json('book is updated')
// })
// app.delete('/books/:id', (req, res) => {
//     res.json('book is deleted')
// })

//404
app.use((req, res) => {
    res.status(404).send('404')
})