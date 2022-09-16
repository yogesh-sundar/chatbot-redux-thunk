// import {
//   cleanup,
//   fireEvent,
//   getByTestId,
//   render,
//   screen,
//   waitFor,
// } from '@testing-library/react'
// import { Provider } from 'react-redux'
// import App from './App'
// import { store } from './Redux/store'
// import '@testing-library/jest-dom'
// import userEvent from '@testing-library/user-event'

// beforeEach(() => {
//   const comp = render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   )
// })

// const add = (x, y) => x + y

import {add, sub} from "./functions"
import { actionType } from './Redux/Actions/Actions'
import { chatReducer } from "./Redux/Reducer/reducers"

jest.mock('./functions')
const addfun = jest.fn(add)

it('mocks entire module', () => {
  // const addfun = jest.fn(add)
  

  const result = addfun(1, 2);

  // expect(result).toBe(3)
  expect(add.mock).toBeTruthy()
  expect(sub.mock).toBeTruthy()
  expect(add).toHaveBeenCalledTimes(0)
})

test('first mock test', () => {
  const mockAdd = jest.fn((x, y) => x + y)

  expect(mockAdd(1, 2)).toBe(3)
  expect(mockAdd(2, 2)).toBe(4)
  expect(mockAdd).toHaveBeenCalledWith(1, 2)
  expect(mockAdd).toHaveBeenCalled()
  // console.log(mockAdd.mock)
})




describe("Chat reducer", ()=>{
    it("should return default state", ()=>{
        const newState = chatReducer(undefined, {})
        expect(newState.chat).toEqual([])
    })

    it("should return new state if receiving type", ()=>{
      const chats = [{message: "hello"}, {message: "how are you"}]
      const newState = chatReducer(undefined, {
        type:actionType.FETCH_CHAT,
        payload: chats
      })

      expect(newState.chat).toEqual(chats)
    })


})

// afterEach(cleanup)

// describe('zero test', () => {
//   let component
//   beforeEach(() => {
//     component = render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     )
//   })
//   test('first test', () => {
//     const element = screen.getByText(/Yogesh/i)
//     expect(element).toBeInTheDocument()
//   })
// })

// describe('describe test', () => {
//   let component
//   beforeEach(() => {
//     component = render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     )
//   })

//   test('second test', () => {
//     const elem1 = screen.getByText('Yogesh')
//     expect(elem1).toBeInTheDocument()
//   })

//   test('third test', () => {
//     const buttonList = 5

//     expect(buttonList).toBeGreaterThanOrEqual(1)
//   })
// })

// describe('second describe test', () => {
//   let component
//   beforeEach(() => {
//     component = render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     )
//   })

//   test('rendering button', async () => {
//     expect(screen.queryByRole('button')).not.toBeInTheDocument()
//   })

//   test('renderig button after userevent', async () => {
//     userEvent.click(screen.getByTestId('send'))

//     await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(2))
//   })

//   test('rendering text content after userEvent', async () => {
//     userEvent.click(screen.getByTestId('send'))
//     await waitFor(() =>
//       expect(screen.getByTestId('incoming-message')).toBeInTheDocument(),
//     )
//   })
// })

// describe('third describe test', () => {
//   let component
//   beforeEach(() => {
//     component = render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     )
//   })

//   test('should render app without errors', () => {
//     const wrap = screen.getByText('Yogesh')
//     expect(wrap).toBeInTheDocument()
//   })
// })
