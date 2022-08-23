import axios from 'axios'
import { actionType } from '../Actions/Actions'

export const addChat = (chat) => async (dispatch) => {
  const response = await axios.post('http://localhost:5000/chats', chat)

  dispatch({ type: actionType.ADD_CHAT, payload: chat })
}

export const deleteChat = () => async (dispatch) => {
  const response = await axios.post('http://localhost:5000/reset', {
    chats: [],
    bots: [
      {
        id: 1,

        message: 'how can i help you ',

        type: 'out_going',
      },

      {
        id: 2,

        message: 'good ',

        type: 'out_going',
      },
    ],
  })

  dispatch({ type: actionType.DELETE_CHAT, payload: [] })
}

export const fetchBotmsg = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/bots')
  dispatch({ type: actionType.FETCH_BOT_MSG, payload: response.data })
}

export const updateChat = (chat, id) => async (dispatch) => {
  const response = await axios.put(`http://localhost:5000/chats/${id}`, chat)
  dispatch({ type: actionType.EDIT_CHAT })
}

export const fetchChatmsg = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:5000/chats/${id}`)
  dispatch({ type: actionType.FETCH_CHAT_MSG, payload: response.data })
}

export const fetchChat = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/chats')

  dispatch({ type: actionType.FETCH_CHAT, payload: response.data })
}

export const deleteMessage = (id) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:5000/chats/${id}`)

  dispatch({ type: actionType.DELETE_MSG})
}
