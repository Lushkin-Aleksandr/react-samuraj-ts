import React, { ChangeEvent } from 'react'
import styles from '../Profile.module.css'
import { ProfileType } from '../../../redux/profile-reducer'
import avatar from '../../../assets/images/avatar.png'
import ProfileStatus from './ProfileStatus'

type PropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isMine: boolean
  onUploadAvatar: (avatar: File) => void
}

const ProfileInfo: React.FC<PropsType> = props => {
  if (!props.profile) return null

  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    props.onUploadAvatar(e.currentTarget.files![0])
  }

  return (
    <div>
      <div className={styles.profileData}>
        <img style={{ maxWidth: '500px' }} src={props.profile.photos.large || avatar} alt="" />
        {props.isMine && <input type="file" onChange={handleUploadAvatar} />}
        <h1>{props.profile.fullName}</h1>
        {props.isMine ? (
          <>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
          </>
        ) : (
          <span>{props.status}</span>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
