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

export type ActionType = {
    type: string
    payload?: any
}
export type StoreType = {
    _state: StateType,
    getState: () => StateType
    callSubscriber: (state: StateType) => void,
    subscribe: (subscriber: (state: StateType) => void) => void,
    dispatch: (action: ActionType) => void

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
    callSubscriber(state: StateType) {
    },

    subscribe(subscriber) {
        this.callSubscriber = subscriber;
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            this._state.profilePage.posts.unshift({
                id: v1(),
                postText: this._state.profilePage.newPostText,
                likesCount: 0
            })
            this._state.profilePage.newPostText = ''
            this.callSubscriber(this._state)
        } else if (action.type === 'SEND-MESSAGE') {
            this._state.dialogsPage.messages.push({id: v1(), messageText: this._state.dialogsPage.newMessageText})
            this._state.dialogsPage.newMessageText = '';
            this.callSubscriber(this._state)
        } else if (action.type === 'CHANGE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.payload
            this.callSubscriber(this._state)
        } else if (action.type === 'CHANGE-NEW-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.payload
            this.callSubscriber(this._state)
        }
    }


}


export default store;