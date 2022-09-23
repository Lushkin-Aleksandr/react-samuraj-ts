import state, {ActionType, DialogsPageType} from "./state";
import {v1} from "uuid";


const SEND_MESSAGE = 'SEND-MESSAGE';
const CHANGE_NEW_MESSAGE_TEXT = 'CHANGE-NEW-MESSAGE-TEXT';


const dialogsReducer = (state: DialogsPageType, action: ActionType): DialogsPageType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            state.messages.push({id: v1(), messageText: state.newMessageText})
            state.newMessageText = '';
            return state;
        case 'CHANGE-NEW-MESSAGE-TEXT':
            state.newMessageText = action.payload
            return state;
        default:
            return state;
    }
}


export const sendMessageAC = () => ({type: SEND_MESSAGE})
export const changeNewMessageTextAC = (newMessageText: string) => ({type: CHANGE_NEW_MESSAGE_TEXT, payload: newMessageText})


export default dialogsReducer;