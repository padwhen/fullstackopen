const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const likedBlog =  blogs.find(blog => blog.likes === maxLikes)
    return {
        title: likedBlog.title,
        author: likedBlog.author,
        likes: likedBlog.likes
    }
}

const authorWithMostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const authors = blogs.map(blog => blog.author)
    const author = authors.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1
        return prev
    }
    , {})
    const [maxAuthor, maxCount] = Object.entries(author).reduce((acc, [author, count]) => {
        if (count > acc[1]) {
            return [author, count]
        } else {
            return acc
        }
    }, ["", 0])
    return {
        author: maxAuthor,
        blogs: maxCount
    }
}

const authorWithMostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const authors = blogs.map(blog => [blog.author, blog.likes])
    let authorWithLikes = {}
    for (const [author, likes] of authors) {
        if (authorWithLikes[author]) {
            authorWithLikes[author] += likes
        } else {
            authorWithLikes[author] = likes
        }
    }
    const [maxAuthor, maxLike] = Object.entries(authorWithLikes).reduce((acc, [author, like]) => {
        if (like > acc[1]) {
            return [author, like]
        } else {
            return acc
        }
    },["",0])

    return {
        author: maxAuthor,
        likes: maxLike
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    authorWithMostBlogs,
    authorWithMostLikes
}