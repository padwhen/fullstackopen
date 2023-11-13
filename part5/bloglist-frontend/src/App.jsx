import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setErrorMessage] = useState(null)
  const [sucess, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blog')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('blog', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        username
        <input type='text' value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='password' value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logOut = () => {
    window.localStorage.removeItem('blog')
    blogService.setToken(null)
    setUser(null)
  }
  const logOutButton = () => (
    <button onClick={logOut}>logout</button>
  )

  const createNewNote = () => (
    <form onSubmit={saveNote}>
      <h1>create new</h1>
      <div>title:
        <input type="text" value={title} name="Title" onChange={({target}) => setTitle(target.value)} />
      </div>
      <div>author:
        <input type="text" value={author} name="Author" onChange={({target}) => setAuthor(target.value)} />
      </div>
      <div>url:
        <input type="text" value={url} name="Url" onChange={({target}) => setUrl(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )

  const saveNote = async event => {
    event.preventDefault()
    try {
      const newBlog = {title, author, url}
      blogService.create(newBlog).then((returnedBlog) => {
        setBlogs([...blogs, returnedBlog])
      setSuccessMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {setSuccessMessage(null)}, 5000)
      })
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  return (
    <div>
    {error === "Wrong credentials" && <div className='error'>wrong username or password</div>}
    {sucess && <div className='success'>{sucess}</div>}
    {user === null && loginForm()}
    {user && <div>
      <h2>blogs</h2>
      <p>{user.name} logged in {logOutButton()}</p>
      {createNewNote()}
      {blogs
      .filter((blog) => blog.user && blog.user.username === user.username)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
}
    </div>
  )
}

export default App