import profileReducer, {addPostAC, ProfilePageType, removePostAC} from "./profile-reducer";
import {v1} from "uuid";


let initialState: ProfilePageType
const postId1 = v1()
const postId2 = v1()

beforeEach(() => {
    initialState = {
        profile: null,
        posts: [
            {id: postId1, postText: 'Hi, how are you?', likesCount: 5},
            {id: postId2, postText: `It's my first post.`, likesCount: 10},
        ],
        status: ''
    }
})

describe('profile reducer', () => {
    describe('adding post', () => {
        test('after adding new post, posts length should be equal 3', () => {
            const newState = profileReducer(initialState, addPostAC('New post'))
            expect(newState.posts.length).toBe(3)
        })
        test('after adding, new post should be first of list', () => {
            const newState = profileReducer(initialState, addPostAC('New post'))
            expect(newState.posts[0].postText).toBe('New post')
            expect(newState.posts[1].id).toBe(initialState.posts[0].id)
        })
    })

    test('should return the initial state when passed an empty action', () => {
        // @ts-ignore
        expect(profileReducer(initialState, {type: ''})).toBe(initialState)
    })
    test('correct post should be removed', () => {
        const newState = profileReducer(initialState, removePostAC(postId1))
        expect(newState.posts.includes(initialState.posts[0])).toBeFalsy()
    })
})