import axios from 'axios'

const API_URL = '/api/tickets'

const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const resp = await axios.get(API_URL + `/${ticketId}/notes`, config)
    return resp.data
}


const createNote = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const resp = await axios.post(API_URL + `/${ticketId}/notes`, {text: noteText}, config)
    return resp.data
}


const noteService = {
    getNotes,
    createNote
}

export default noteService