import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }
  const handleLike = async () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    try {
      await blogService.update(blog.id, updatedBlog)
      updateBlog()
    } catch (error) {
      console.error(`Error updating blog: ${error.message}`)
    }
  }
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        updateBlog()
      } catch (error) {
        console.error(`Error updating blog: ${error.message}`)
      }
    }
  }
  return (
  <div style={blogStyle}>
    <div>
      {blog.title}
      <button onClick={toggleDetails}>
      {showDetails ? 'Hide' : 'View'}
      </button>
    </div>
    {showDetails && (
      <div>
        <p>{blog.url} {blog.author}</p>
        <p>{blog.likes}<button onClick={handleLike}>like</button>
          <button onClick={handleDelete}>delete</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    )}  
  </div>  
  )
}

export default Blog