const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-blog')

Post.find({}, (error, post) => {
  console.log(error, post)  
})

// Post.findByIdAndDelete('62fc11bdd37f475672e41f8b', (error, post) => {
//     console.log(error,post)
// })

// Post.findById("62fc11ae1e6b91898952f6c8", (error, post) => {
//     console.log(error, post)
// })

// Post.findByIdAndUpdate("62fc11ae1e6b91898952f6c8", {
//     title: 'My first blog post titel lorem ipsum'
// }, (error, post) => {
//     console.log(error, post)
// })

// Post.create({
//     title: 'wootang forever title',
//     description: 'wootang forever description',
//     content: 'wootang forever Lorem ipsum content.'
// }, (error, post) => {
//     console.log(error, post)
// })

