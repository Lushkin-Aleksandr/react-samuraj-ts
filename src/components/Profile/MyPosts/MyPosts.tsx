import React from 'react';
import Post from "./Post/Post";
import styles from '../../../cssModules/Profile.module.css'
import {PostType} from "../../../redux/state";

type MyPostsPropsType = {
    posts: PostType[]
}

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const postElements: JSX.Element[] = props.posts.map(p => <Post key={p.id} postText={p.postText} likesCount={p.likesCount}/>)




    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            {postElements}
        </div>
    );
};

export default MyPosts;