import {v1} from "uuid";


const SEND_MESSAGE = 'SEND-MESSAGE';

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
}
type SendMessageActionType = ReturnType<typeof sendMessageAC>
export type DialogsActionType = SendMessageActionType


const initialState: DialogsPageType = {
    dialogs: [
        {id: v1(), name: 'Petya', lastMessage: 'Hello!'},
        {id: v1(), name: 'Vasya', lastMessage: 'How are you doing?'},
        {id: v1(), name: 'Masha', lastMessage: 'React pizza'},
        {id: v1(), name: 'Vitya', lastMessage: 'Study grids'},
        {id: v1(), name: 'Eva', lastMessage: 'My name is Eva...'},
    ],
    messages: [],
}

const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionType): DialogsPageType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const newMessage = {id: v1(), messageText: action.payload.messageText}
            return {...state, messages: [...state.messages, newMessage]};

        default:
            return state;
    }
}


export const sendMessageAC = (messageText: string) => ({type: SEND_MESSAGE, payload: {messageText}} as const)


export default dialogsReducer;