import {v1} from "uuid";
import profileReducer, {addPostAC, changeNewPostTextAC} from "./profile-reducer";
import dialogsReducer, {changeNewMessageTextAC, sendMessageAC} from "./dialogs-reducer";


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
export type DialogsActionType = ReturnType<typeof sendMessageAC> | ReturnType<typeof changeNewMessageTextAC>;
export type ProfileActionType = ReturnType<typeof addPostAC> | ReturnType<typeof changeNewPostTextAC>;
export type ActionTypes = ProfileActionType | DialogsActionType;
export type StoreType = {
    _state: StateType,
    getState: () => StateType
    callSubscriber: (state: StateType) => void,
    subscribe: (subscriber: (state: StateType) => void) => void,
    dispatch: (action: ActionTypes) => void

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
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this.callSubscriber(this._state)
    }


}


export default store;