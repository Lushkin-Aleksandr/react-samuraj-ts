import React from 'react';
import styles from '../../../../cssModules/Profile.module.css'
import avatar from '../../../../assets/avatar.png'

type PostPropsType = {
    postText: string,
    likesCount: number
}

const Post = (props: PostPropsType) => {
    return (
        <div className={styles.post}>
            <img className={styles.avatarImg}
                 src={avatar}
                 alt="avatar"/>
            <p>{props.postText}</p>
            <span>{`${props.likesCount} ${props.likesCount !== 1 ? 'likes' : 'like'}`}</span>
        </div>
    );
};

export default Post;