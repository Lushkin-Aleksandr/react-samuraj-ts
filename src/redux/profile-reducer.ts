import {ActionTypes, ProfilePageType} from "./state";
import {v1} from "uuid";

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';


const profileReducer = (state: ProfilePageType, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            state.posts.unshift({
                id: v1(),
                postText: state.newPostText,
                likesCount: 0
            })
            state.newPostText = ''
            return state;
        case 'CHANGE-NEW-POST-TEXT':
            state.newPostText = action.payload
            return state;
        default:
            return state;
    }
}


export const addPostAC = () => ({type: ADD_POST} as const)
export const changeNewPostTextAC = (newPostText: string) => ({type: CHANGE_NEW_POST_TEXT, payload: newPostText} as const)


export default profileReducer;