import React, {ChangeEvent, createRef, RefObject, KeyboardEvent} from 'react';
import Post from "./Post/Post";
import styles from '../../../cssModules/Profile.module.css'
import {addPostAC, changeNewPostTextAC, PostType} from "../../../redux/profile-reducer";
import StoreContext from "../../../StoreContext";

type MyPostsContainerPropsType = {
}

type MyPostsPropsType = {
    posts: PostType[]
    newPostText: string
    addPost: () => void
    changeNewPostText: (newPostText: string) => void
}

const MyPostsContainer: React.FC<MyPostsContainerPropsType> = (props) => {


    return (
        <StoreContext.Consumer>
            {(store) => {
                const addPost = () => store.dispatch(addPostAC())

                const changeNewPostText = (newPostText: string) => {
                    store.dispatch(changeNewPostTextAC(newPostText))
                }

                return <MyPosts
                    posts={store.getState().profilePage.posts}
                    addPost={addPost}
                    newPostText={store.getState().profilePage.newPostText}
                    changeNewPostText={changeNewPostText}/>
            }}
        </StoreContext.Consumer>
    );
};

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const postElements: JSX.Element[] = props.posts.map(p => <Post key={p.id} postText={p.postText}
                                                                   likesCount={p.likesCount}/>)
    const inputRef: RefObject<HTMLTextAreaElement> = createRef();

    const addPost = () => props.addPost()

    const onEnterClickAddPost = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            addPost();
        }
    }

    const onTextareaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewPostText(e.currentTarget.value)
    }


    return (
        <div className={styles.myPosts}>
            <h2 className={styles.myPostsTitle}>My posts</h2>
            <div className={styles.addPost}>
                <div>
                    <textarea
                        className={styles.addPostText}
                        ref={inputRef}
                        value={props.newPostText}
                        onChange={onTextareaChangeHandler}
                        onKeyDown={onEnterClickAddPost}/>
                </div>
                <div>
                    <button
                        className={styles.addPostBtn}
                        onClick={addPost}>Add post
                    </button>
                </div>
            </div>
            {postElements}
        </div>
    );
};

export default MyPostsContainer;