import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import BlogForm from "../components/BlogForm";
import userEvent from "@testing-library/user-event";

test('<BlogForm />', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    render(<BlogForm createBlog={createBlog} />)
    const titleInput = screen.getByPlaceholderText('Harry Potter')
    const authorInput = screen.getByPlaceholderText('J.K. Rowling')
    const urlInput = screen.getByPlaceholderText('harrypotter.com')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Twilight')
    await user.type(authorInput, 'Stephenie Meyer')
    await user.type(urlInput, 'twilight.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Twilight')
    expect(createBlog.mock.calls[0][0].title).toBe('Stephenie Meyer')
    expect(createBlog.mock.calls[0][0].title).toBe('twilight.com')
})