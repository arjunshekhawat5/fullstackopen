const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('./testBlogs')


describe('the most liked blog is', () => {
    test('when all the blogs are checked', () => {
        const result = favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })

    test('when blog list is empty', () => {
        const result = favoriteBlog([])
        expect(result).toBe(null)
    })
})