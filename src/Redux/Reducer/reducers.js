import { actionType } from '../Actions/Actions'

const initialState = {
  chat: [],
  bot: [],
  chatMessage: {},
}

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_CHAT:
      return {
        ...state,
        chat: state.chat.concat(action.payload),
      }

    case actionType.DELETE_CHAT:
      return {
        chat: action.payload,
      }

    case actionType.FETCH_BOT_MSG:
      return {
        ...state,
        bot: action.payload,
      }

    case actionType.EDIT_CHAT:
      return {
        ...state,
        id: action.payload,
      }

    case actionType.FETCH_CHAT_MSG:
      return {
        ...state,
        chatMessage: action.payload,
      }

    case actionType.FETCH_CHAT:
      return {
        ...state,
        chat: action.payload,
      }

    case actionType.DELETE_MSG:
      const data = state.chat.filter((item) => item.id !== action.payload)
      return {
        ...state,
        chat: data,
      }

    default:
      return {
        ...state,
      }
  }
}
