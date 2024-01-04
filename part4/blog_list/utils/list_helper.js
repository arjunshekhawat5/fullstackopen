const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.length == 0
        ? 0
        : blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}

const mostLiked = (blogs) => {
    if (blogs.length == 0) {
        return null
    }

    return blogs.reduce((mostLikedBlog, currentBlog) => {
        return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog
    }, blogs[0])
}

module.exports = {
    dummy,
    totalLikes,
    mostLiked
}