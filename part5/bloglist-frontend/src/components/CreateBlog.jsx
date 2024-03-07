const CreateBlog = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => {
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>title: <input
                    type='text'
                    value={title}
                    name='title'
                    onChange={handleTitleChange} />
                </div>
                <div>
                    author: <input
                    type='text'
                    value={author}
                    name='author'
                    onChange={handleAuthorChange} />
                </div>
                <div>
                    url: <input
                    type='text'
                    value={url}
                    name='url'
                    onChange={handleUrlChange} />
                </div>
                <button type='submit'>Create Blog</button>
            </form>
        </div>
    )
}

export default CreateBlog