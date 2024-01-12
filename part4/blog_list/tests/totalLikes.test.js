const totalLikes = require('../utils/list_helper').totalLikes
const blogs = require('./testBlogs')

describe('total likes', () => {
    test('when list has only one blog, the total likes equals to', () => {
        const result = totalLikes([blogs[0]])
        expect(result).toBe(7)
    })

    test('when list has no blogs', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('when list has all the blogs', () => {
        expect(totalLikes(blogs)).toBe(36)
    })

    test('when list has blogs with 0 likes', () => {
        expect(totalLikes([blogs[4]])).toBe(0)
    })
})