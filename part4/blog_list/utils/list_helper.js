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
    if (blogs.length === 0) {
        return null
    }

    return blogs.reduce((mostLikedBlog, currentBlog) => {
        return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog
    }, blogs[0])
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    const groupedByAuthor = lodash.groupBy(blogs, (blog) => blog.author)
    //return groupedByAuthor
    const authorBlogsArray = Object.entries(groupedByAuthor).map(([author, blogs]) => ({ author, blogs }))

    const sortedAuthors = lodash.sortBy(authorBlogsArray, (author) => -author.blogs.length)

    return {
        author: sortedAuthors[0].author,
        blogs: sortedAuthors[0].blogs.length
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const groupedByAuthor = lodash.groupBy(blogs, (blog) => blog.author)

    const authorBlogsArray = Object.entries(groupedByAuthor).map(([author, blogs]) => {
        return ({
            author,
            likes: blogs.reduce((likes, blog) => likes + blog.likes, 0)
        })
    })

    const sortedAuthorsByLikes = lodash.sortBy(authorBlogsArray, (author) => -author.likes)
    return {
        author: sortedAuthorsByLikes[0].author,
        likes: sortedAuthorsByLikes[0].likes
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}