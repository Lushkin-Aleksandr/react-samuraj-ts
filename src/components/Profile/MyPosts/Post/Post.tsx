import React from 'react'
import styles from '../../Profile.module.css'
import avatarImg from '../../../../assets/images/avatar.png'

type PostPropsType = {
  postText: string
  likesCount: number
  avatar?: string
}

const Post = (props: PostPropsType) => {
  return (
    <div className={styles.post}>
      <img className={styles.avatarImg} src={props.avatar ? props.avatar : avatarImg} alt="avatar" />
      <p>{props.postText}</p>
      <span>{`${props.likesCount} ${props.likesCount !== 1 ? 'likes' : 'like'}`}</span>
    </div>
  )
}

export default Post
