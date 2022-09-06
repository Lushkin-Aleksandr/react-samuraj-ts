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
}
export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessageType[]
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
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: v1(), name: 'Petya', lastMessage: 'Hello!'},
            {id: v1(), name: 'Vasya', lastMessage: 'How are you doing?'},
            {id: v1(), name: 'Masha', lastMessage: 'React pizza'},
            {id: v1(), name: 'Vitya', lastMessage: 'Study grids'},
            {id: v1(), name: 'Eva', lastMessage: 'My name is Eva...'},
        ],
        messages: []
    }
}


export const addPost = (postText: string) => {
    state.profilePage.posts.push({id: v1(), postText, likesCount: 0})
}

export const sendMessage = (messageText: string) => {
    state.dialogsPage.messages.push({id: v1(), messageText})
}



export default state;