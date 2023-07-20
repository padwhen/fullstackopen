const mongoose = require('mongoose')
<<<<<<< HEAD

=======
>>>>>>> 06b54446d58c7204a26a2d6e1a3a255afd384e0d
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
<<<<<<< HEAD

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Blog', blogSchema)    
=======
module.exports = mongoose.model('blog', blogSchema)
>>>>>>> 06b54446d58c7204a26a2d6e1a3a255afd384e0d
