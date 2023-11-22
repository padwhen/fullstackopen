import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setErrorMessage] = useState(null)
  const [sucess, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blog')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateBlogs = async () => {
    const updatedBlogs = await blogService.getAll()
    const sortedBlogs = updatedBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const blogFormRef = useRef()

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
        <input id='username' type='text' value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input id='password' type='password' value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button id='login-button' type="submit">login</button>
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
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={saveBlog} />
    </Togglable>
  )
  const saveBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs([...blogs, returnedBlog])
      updateBlogs()
    })
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
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlogs}  />
      ))}
    </div>
}
    </div>
  )
}

export default App