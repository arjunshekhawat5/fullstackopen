const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.length == 0
        ? 0
        : blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) {
        return null
    }

    return blogs.reduce((mostLikedBlog, currentBlog) => {
        return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog
    }, blogs[0])
}

const mostBlogs = (blogs) => {

    if (blogs.length == 0){
        return null
    }

    const groupedByAuthor = lodash.groupBy(blogs, (blog) => blog.author)
    //return groupedByAuthor
    const authorerBlogsArray = Object.entries(groupedByAuthor).map(([author, blogs]) => ({ author, blogs }))

    const sortedAuthors = lodash.sortBy(authorerBlogsArray, (author) => -author.blogs.length)

    return {
        author: sortedAuthors[0].author,
        blogs: sortedAuthors[0].blogs.length
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}