import { useState } from "react";

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const addBlog = event => {
        event.preventDefault()
        createBlog({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input type="text" value={title} placeholder="Harry Potter" onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    author
                    <input type="text" value={author} placeholder="J.K. Rowling" onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div>
                    url
                    <input type="text" value={url} placeholder="harrypotter.com" onChange={(event) => setUrl(event.target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm