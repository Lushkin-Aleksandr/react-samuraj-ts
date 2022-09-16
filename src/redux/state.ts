import {v1} from "uuid";


// Types
export type MessageType = {
    id: string
    messageText: string
}
export type DialogsType = {
    id: string
    name: string
    lastMessage: string
}
export type PostType = {
    id: string
    postText: string
    likesCount: number
}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessageType[]
    newMessageText: string
}
export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}


// State
const state: StateType = {
    profilePage: {
        posts: [
            {id: v1(), postText: 'Hi, how are you?', likesCount: 5},
            {id: v1(), postText: `It's my first post.`, likesCount: 10},
        ],
        newPostText: ''
    },
    dialogsPage: {
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
}

let callSubscriber: (state: StateType) => void;

export const addPost = () => {
    state.profilePage.posts.unshift({id: v1(), postText: state.profilePage.newPostText, likesCount: 0})
    state.profilePage.newPostText = ''
    callSubscriber(state)
}

export const sendMessage = () => {
    state.dialogsPage.messages.push({id: v1(), messageText: state.dialogsPage.newMessageText})
    state.dialogsPage.newMessageText = '';
    callSubscriber(state)
}

export const changeNewPostText = (newPostText: string) => {
    state.profilePage.newPostText = newPostText
    callSubscriber(state)
}

export const changeNewMessageText = (newMessageText: string) => {
    state.dialogsPage.newMessageText = newMessageText
    callSubscriber(state)
}

export const subscribe = (subscriber: (state: StateType) => void) => {
    callSubscriber = subscriber;
}

export default state;