import React, {ChangeEvent, createRef, KeyboardEvent, RefObject} from 'react';
import Post from "./Post/Post";
import styles from '../../../cssModules/Profile.module.css'
import {MyPostsPropsType} from "./MyPostsContainer";


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const postElements: JSX.Element[] = props.posts.map(p => <Post key={p.id} postText={p.postText}
                                                                   likesCount={p.likesCount}/>)
    const inputRef: RefObject<HTMLTextAreaElement> = createRef();

    const addPost = () => {
        props.addPost()
        props.changeNewPostText('')
    }

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

