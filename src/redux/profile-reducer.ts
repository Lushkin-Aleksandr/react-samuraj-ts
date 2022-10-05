import {v1} from "uuid";

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';

type AddPostActionType = ReturnType<typeof addPostAC>
type changeNewPostTextActionType = ReturnType<typeof changeNewPostTextAC>
export type ProfileActionTypes = AddPostActionType | changeNewPostTextActionType


export type PostType = {
    id: string
    postText: string
    likesCount: number
}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}

const initialState: ProfilePageType = {
    posts: [
        {id: v1(), postText: 'Hi, how are you?', likesCount: 5},
        {id: v1(), postText: `It's my first post.`, likesCount: 10},
    ],
    newPostText: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostType = {
                id: v1(),
                postText: state.newPostText,
                likesCount: 0
            }

            return  {
                ...state,
                posts: [
                    newPost,
                    ...state.posts
                ]
            }

            return state;
        case 'CHANGE-NEW-POST-TEXT':
            state.newPostText = action.payload
            return {...state, newPostText: action.payload};
        default:
            return state;
    }
}


export const addPostAC = () => ({type: ADD_POST} as const)
export const changeNewPostTextAC = (newPostText: string) => ({
    type: CHANGE_NEW_POST_TEXT,
    payload: newPostText
} as const)


export default profileReducer;