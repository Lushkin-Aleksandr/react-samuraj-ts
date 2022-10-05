import {v1} from "uuid";


const SEND_MESSAGE = 'SEND-MESSAGE';
const CHANGE_NEW_MESSAGE_TEXT = 'CHANGE-NEW-MESSAGE-TEXT';

export type MessageType = {
    id: string
    messageText: string
}
export type DialogType = {
    id: string
    name: string
    lastMessage: string
}
export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
}
type SendMessageActionType = ReturnType<typeof sendMessageAC>
type changeNewMessageTextActionType = ReturnType<typeof changeNewMessageTextAC>
export type DialogsActionTypes = SendMessageActionType | changeNewMessageTextActionType


const initialState: DialogsPageType = {
    dialogs: [
        {id: v1(), name: 'Petya', lastMessage: 'Hello!'},
        {id: v1(), name: 'Vasya', lastMessage: 'How are you doing?'},
        {id: v1(), name: 'Masha', lastMessage: 'React pizza'},
        {id: v1(), name: 'Vitya', lastMessage: 'Study grids'},
        {id: v1(), name: 'Eva', lastMessage: 'My name is Eva...'},
    ],
    messages: [],
    newMessageText: ''
}

const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionTypes): DialogsPageType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const newMessage = {id: v1(), messageText: state.newMessageText}
            return {...state, messages: [...state.messages, newMessage]};
        case 'CHANGE-NEW-MESSAGE-TEXT':
            return {...state, newMessageText: action.payload};
        default:
            return state;
    }
}


export const sendMessageAC = () => ({type: SEND_MESSAGE} as const)
export const changeNewMessageTextAC = (newMessageText: string) => ({type: CHANGE_NEW_MESSAGE_TEXT, payload: newMessageText} as const)


export default dialogsReducer;