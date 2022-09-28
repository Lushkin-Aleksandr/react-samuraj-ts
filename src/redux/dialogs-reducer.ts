import {v1} from "uuid";


const SEND_MESSAGE = 'SEND-MESSAGE';
const CHANGE_NEW_MESSAGE_TEXT = 'CHANGE-NEW-MESSAGE-TEXT';

export type MessageType = {
    id: string
    messageText: string
}
export type DialogsType = {
    id: string
    name: string
    lastMessage: string
}
export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessageType[]
    newMessageText: string
}
type SendMessageActionType = ReturnType<typeof sendMessageAC>
type changeNewMessageTextActionType = ReturnType<typeof changeNewMessageTextAC>
type ActionTypes = SendMessageActionType | changeNewMessageTextActionType


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

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionTypes): DialogsPageType => {
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