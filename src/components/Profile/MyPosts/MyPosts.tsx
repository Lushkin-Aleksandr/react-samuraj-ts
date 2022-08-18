import React from 'react';
import Post from "./Post/Post";
import styles from '../../../cssModules/Profile.module.css'

const MyPosts = () => {
    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <Post postText='Hi, how are you?' likesCount={5}/>
            <Post postText={`It's my first post.`} likesCount={10}/>
        </div>
    );
};

export default MyPosts;