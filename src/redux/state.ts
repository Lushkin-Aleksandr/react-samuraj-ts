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
export type StoreType = {
    _state: StateType,
    getState: () => StateType
    callSubscriber: (state: StateType) => void,
    addPost: () => void,
    sendMessage: () => void,
    changeNewPostText: (newPostText: string) => void,
    changeNewMessageText: (newMessageText: string) => void,
    subscribe: (subscriber: (state: StateType) => void) => void,

}


const store: StoreType = {
    _state: {
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
    },
    getState() {
      return this._state
    },
    callSubscriber(state: StateType) {},
    addPost() {
        this._state.profilePage.posts.unshift({id: v1(), postText: this._state.profilePage.newPostText, likesCount: 0})
        this._state.profilePage.newPostText = ''
        this.callSubscriber(this._state)
    },
    sendMessage() {
        this._state.dialogsPage.messages.push({id: v1(), messageText: this._state.dialogsPage.newMessageText})
        this._state.dialogsPage.newMessageText = '';
        this.callSubscriber(this._state)
    },
    changeNewPostText(newPostText) {
        this._state.profilePage.newPostText = newPostText
        this.callSubscriber(this._state)
    },
    changeNewMessageText(newMessageText) {
        this._state.dialogsPage.newMessageText = newMessageText
        this.callSubscriber(this._state)
    },
    subscribe(subscriber) {
        this.callSubscriber = subscriber;
    }


}



export default store;