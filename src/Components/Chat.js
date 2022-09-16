import {
  TextField,
  Typography,
  InputAdornment,
  Button,
  Modal,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import profile from '../Assets/profile.png'
import TelegramIcon from '@mui/icons-material/Telegram'
import { useDispatch, useSelector } from 'react-redux'
import {
  addChat,
  deleteChat,
  deleteMessage,
  fetchBotmsg,
  fetchChat,
  fetchChatmsg,
  updateChat,
} from '../Redux/ActionCreators/actionCreator'

function Chat() {

  const data = useSelector((state) => state.data.chat)
  const botData = useSelector((botmsg) => botmsg.data.bot)

  const msgData = useSelector((message) => message.data.chatMessage)

  let dispatch = useDispatch()

  const [modelOpen, setModalOpen] = useState(false)
  const [id, setId] = useState('')

  const [chatDetails, setchatDetails] = useState({
    // id: "",
    message: '',
    type: 'incoming',
  })

  const [chatMessage, setChatmessage] = useState({
    message: '',
    type: '',
    id: '',
  })

  const handleChange = (e) => {
    setchatDetails({ ...chatDetails, [e.target.name]: e.target.value })
    // setchatDetails({ ...chatDetails, id: data.id })
  }

  useEffect(() => {
    dispatch(deleteChat())
  }, [])

  const handleSend = () => {
    // console.log('details', chatDetails)
    if (chatDetails) {
      // dispatch(deleteChat())
      dispatch(addChat(chatDetails))
      dispatch(fetchChat())
      dispatch(fetchBotmsg())
      setchatDetails({ message: '', type: 'incoming' })
    }
  }

  const handleIncoming = (id) => {
    dispatch(fetchChatmsg(id))
    setModalOpen(true)
    console.log('id', id)
  }

  useEffect(() => {
    if (msgData) {
      setChatmessage({ ...msgData })
      setId(msgData.id)
      // console.log('msgData', msgData.id)
    }
  }, [msgData])

  const handleMessagechange = (e) => {
    setChatmessage({ ...chatMessage, [e.target.name]: e.target.value })
    console.log('value', e.target.value)
  }

  const handleUpdateMessage = () => {
    console.log('chatMessage', chatMessage)
    // const id = chatMessage.id;
    if (chatMessage && id) {
      dispatch(updateChat(chatMessage, id))
      setModalOpen(false)
      if (window.confirm('Are you sure to update a message?')) {
        dispatch(fetchChat())
      }
    }
  }

  const handleDeleteMessage = (id) => {
    dispatch(deleteMessage(id))
    if (window.confirm('Are you sure to delete the message?')) {
      dispatch(fetchChat())
    }
  }

  const cancelUpdateMessage = () => {
    setModalOpen(false)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <div className="chat-container">
        <div className="heading-container">
          <div className="first-container">
            <KeyboardArrowLeftIcon />
            <div className="profile-container">
              <img src={profile} alt="profile" />
              <Typography>Yogesh</Typography>
            </div>
          </div>
          <div className="second-container">
            <MoreHorizIcon />
          </div>
        </div>
        <hr />
        <div className="chat-content">
          {data.length === 0 ? (
            <div>No chats...Kindly start Typing</div>
          ) : (
            <>
              {data.length ? (
                <>
                  {data.map((item, i) => (
                    <div

                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div className="incoming-msg-container">
                        <div data-testid="incoming-message" className="incoming-msg">{item.message}</div>
                        <span>
                          <Button
                            className="edit-btn"
                            onClick={() => handleIncoming(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="del-btn"
                            onClick={() => handleDeleteMessage(item.id)}
                          >
                            Delete
                          </Button>
                        </span>
                      </div>
                      <div
                        className="outgoing-msg"
                        style={{ marginTop: '70px' }}
                      >
                        {botData ? <>{botData[i].message}</> : ''}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                ''
              )}
            </>
          )}
        </div>
        <div>
          <TextField
            className="text-box"
            name="message"
            value={chatDetails.message}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& > fieldset': {
                  border: 'none',
                },
              },
            }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TelegramIcon
                  data-testid="send"
                    className="telegram-icon"
                    onClick={handleSend}
                  />
                </InputAdornment>
              ),
            }}
            placeholder="Type Your Message"
          />
        </div>
      </div>
      <Modal
        open={modelOpen}
        onClose={closeModal}
        className="message-edit-modal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container">
          <Typography>Edit message</Typography>
          <TextField
            fullWidth
            name="message"
            value={chatMessage.message}
            onChange={handleMessagechange}
          />
          <div className="button-container">
            <Button
              className="update-btn"
              variant="contained"
              onClick={handleUpdateMessage}
            >
              Update
            </Button>
            <Button
              className="cancel-btn"
              variant="contained"
              onClick={cancelUpdateMessage}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Chat
