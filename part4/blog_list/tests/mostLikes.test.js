const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./testBlogs')

describe('author with most likes on his blogs when', () => {
    test('when checking the whole blog list', () => {
        expect(mostLikes(blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })

    test('when checking an empty blog list', () => {
        expect(mostLikes([])).toBe(null)
    })

})