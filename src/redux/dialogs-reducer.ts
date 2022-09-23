import {ActionTypes, DialogsPageType} from "./state";
import {v1} from "uuid";


const SEND_MESSAGE = 'SEND-MESSAGE';
const CHANGE_NEW_MESSAGE_TEXT = 'CHANGE-NEW-MESSAGE-TEXT';


const dialogsReducer = (state: DialogsPageType, action: ActionTypes): DialogsPageType => {
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


export const sendMessageAC = () => ({type: SEND_MESSAGE} as const)
export const changeNewMessageTextAC = (newMessageText: string) => ({type: CHANGE_NEW_MESSAGE_TEXT, payload: newMessageText} as const)


export default dialogsReducer;