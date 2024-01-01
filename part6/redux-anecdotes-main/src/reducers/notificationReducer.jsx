import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        }
    }
})

export const showNotification = (text, duration) => {
    return dispatch => {
        dispatch(setNotification(text))
        setTimeout(() => {
            dispatch(clearNotification())
        }, duration * 1000)
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer