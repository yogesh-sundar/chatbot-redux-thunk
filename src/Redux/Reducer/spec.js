import { actionType } from '../Actions/Actions'
import { chatReducer } from "./reducers"


describe("Chat reducer", ()=>{
    it("should return default state", ()=>{
        const newState = chatReducer(undefined, {})
        expect(newState).toEqual([])
    })
})