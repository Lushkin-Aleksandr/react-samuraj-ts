import React from 'react'
import styles from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { ProfileType } from '../../redux/profile-reducer'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileFormDataType } from './ProfileInfo/ProfileData/ProfileDataForm'

type PropsType = {
  profile: ProfileType
  status: string
  isMine: boolean
  updateStatus(status: string): void
  uploadAvatar(avatar: File): void
  updateProfileData(profileData: ProfileFormDataType): Promise<boolean>
}

const Profile: React.FC<PropsType> = props => {
  return (
    <div className={styles.profile}>
      <ProfileInfo
        onUploadAvatar={props.uploadAvatar}
        profile={props.profile}
        status={props.status}
        onUpdateStatus={props.updateStatus}
        isMine={props.isMine}
        onUpdateProfileData={props.updateProfileData}
      />
      <MyPostsContainer isMine={props.isMine} />
    </div>
  )
}

export default Profile
