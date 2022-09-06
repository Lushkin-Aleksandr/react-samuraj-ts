import React, {createRef, RefObject} from 'react';
import Post from "./Post/Post";
import styles from '../../../cssModules/Profile.module.css'
import {PostType} from "../../../redux/state";

type MyPostsPropsType = {
    posts: PostType[]
    addPost: (postText: string) => void
}

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const postElements: JSX.Element[] = props.posts.map(p => <Post key={p.id} postText={p.postText}
                                                                   likesCount={p.likesCount}/>)
    const inputRef: RefObject<HTMLTextAreaElement> = createRef();

    const addPost = () => {
        const text = inputRef.current?.value
        if (text) {
            props.addPost(text);
        }
    }


    return (
        <div className={styles.myPosts}>
            <h2 className={styles.myPostsTitle}>My posts</h2>
            <div className={styles.addPost}>
                <div>
                    <textarea
                        className={styles.addPostText}
                        ref={inputRef}></textarea>
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

export default MyPosts;