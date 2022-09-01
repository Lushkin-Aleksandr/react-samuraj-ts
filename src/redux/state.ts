
// Types
export type DialogsType = {
    id: number
    name: string
    lastMessage: string
}

export type PostType = {
    id: number
    postText: string
    likesCount: number
}


export type ProfilePageType = {
    posts: PostType[]
}

export type DialogsPageType = {
    dialogs: DialogsType[]
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}




// State
const state = {
    profilePage: {
        posts: [
            {id: 1, postText: 'Hi, how are you?', likesCount: 5},
            {id: 2, postText: `It's my first post.`, likesCount: 10},
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Petya', lastMessage: 'Hello!'},
            {id: 2, name: 'Vasya', lastMessage: 'How are you doing?'},
            {id: 3, name: 'Masha', lastMessage: 'React pizza'},
            {id: 4, name: 'Vitya', lastMessage: 'Study grids'},
            {id: 5, name: 'Eva', lastMessage: 'My name is Eva...'},
        ]
    }
}

export default state;