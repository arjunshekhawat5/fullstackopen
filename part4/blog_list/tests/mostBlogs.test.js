const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./testBlogs')

describe('the author who has the most blogs', () => {
    test('when given all blogs', () => {
        const result = mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })

    test('when an empty blog list is givem', () => {
        const result = mostBlogs([])
        expect(result).toBe(null)
    })

})