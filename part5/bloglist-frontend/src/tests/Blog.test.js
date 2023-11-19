import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe('<Blog />', () => {
    let container
    const blog = {
        title: 'Twilight',
        author: 'Stephenie Meyer',
        url: "twilight.com",
        likes: 10249120,
        user: {
            name: 'Edward Cullen'
        }
    }
    beforeEach(() => {
        container = render(<Blog blog={blog} user={blog.user} />).container
    })
    test('render blogs title and author, but not url and likes', () => {
        const titleElement = screen.findAllByText('Twilight')
        const authorElement = screen.findAllByText('Stephenie Meyer')
        const urlElement = screen.queryByText('url')
        const likesElement = screen.queryByText('likes')
        expect(titleElement).toBeDefined()
        expect(authorElement).toBeDefined()
        expect(urlElement).toBeNull()
        expect(likesElement).toBeNull()
    })  
    test('button clicked, url and likes', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)
        const urlElement = screen.findAllByText('twilight.com')
        const likesElement = screen.findAllByText('10249120')
        expect(urlElement).toBeDefined()
        expect(likesElement).toBeDefined()
    })
})

test('like button is clicked twice', async () => {
    const blog = {
        title: 'Twilight',
        author: 'Stephenie Meyer',
        url: "twilight.com",
        likes: "10249120",
        user: {
            name: 'Edward Cullen'
        }
    }
    const mockHandler = jest.fn()
    const updateBlog = () => null
    const {container} = render(<Blog blog={blog} user={blog.user} updateBlog={updateBlog} handleLike={mockHandler} />)
    const user = userEvent.setup()

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByRole('button', { name: 'like'})
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

})
