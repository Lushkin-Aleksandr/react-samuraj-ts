import React from 'react'
import styles from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { ProfileType } from '../../redux/profile-reducer'
import MyPostsContainer from './MyPosts/MyPostsContainer'

type PropsType = {
  profile: ProfileType
  status: string
  isMine: boolean
  updateStatus: (status: string) => void
  uploadAvatar: (avatar: File) => void
}

const Profile: React.FC<PropsType> = props => {
  return (
    <div className={styles.profile}>
      <ProfileInfo
        onUploadAvatar={props.uploadAvatar}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isMine={props.isMine}
      />
      <MyPostsContainer isMine={props.isMine} />
    </div>
  )
}

export default Profile
