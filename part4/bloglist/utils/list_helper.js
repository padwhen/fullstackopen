const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length == 1) { return blogs[0].likes }
    sum = 0
    for (i = 0; i < blogs.length; i++) {
        sum += blogs[i].likes
    }
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 1) { 
        const {_id, url, __v, ...filteredBlog} = blogs[0]
        return filteredBlog;
    }
    const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes )
    const {_id, url, __v, ...filteredBlog} = blogs[0]
    return filteredBlog;

}

const mostBlogs = (blogs) => {
    const blogCount = {}
    blogs.forEach((blog) => {
        if (blog.author in blogCount) {
            blogCount[blog.author]++
        } else {
            blogCount[blog.author] = 1
        }
    })
    let topAuthor = ""
    let maxBlogs = 0
    for (const author in blogCount) {
        if (blogCount[author] > maxBlogs) {
            topAuthor = author
            maxBlogs = blogCount[author]
        }
    }
    return {
        author: topAuthor,
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    const authorLikes = {}
    blogs.forEach((blog) => {
        if (blog.author in authorLikes) {
            authorLikes[blog.author] += blog.likes
        } else {
            authorLikes[blog.author] = blog.likes
        }
    })
    let topAuthor = ""
    let mostLikes = 0
    for (const author in authorLikes) {
        if (authorLikes[author] > mostLikes) {
            topAuthor = author
            mostLikes = authorLikes[author]
        }
    }
    return {
        author: topAuthor,
        likes: mostLikes
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }