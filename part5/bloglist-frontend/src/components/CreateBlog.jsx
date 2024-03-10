import { useState } from "react"

const CreateBlog = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const newBlog = {
            "title": title,
            "author": author,
            "url": url
        }
        addBlog(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>title: <input
                    type='text'
                    value={title}
                    name='title'
                    onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    <div>
                        author: <input
                            type='text'
                            value={author}
                            name='author'
                            onChange={(event) => setAuthor(event.target.value)} />
                    </div>
                    <div>
                        url: <input
                            type='text'
                            value={url}
                            name='url'
                            onChange={(event) => setUrl(event.target.value)} />
                    </div>
                </div>
                <button type='submit'>Create Blog</button>
            </form>
        </div>
    )
}

export default CreateBlog