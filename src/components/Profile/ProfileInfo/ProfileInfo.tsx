import React, { ChangeEvent, useState } from 'react'
import styles from '../Profile.module.css'
import { ProfileType } from '../../../redux/profile-reducer'
import avatar from '../../../assets/images/avatar.png'
import ProfileStatus from './ProfileStatus'
import { ProfileData } from './ProfileData/ProfileData'
import { ProfileDataReduxForm, ProfileFormDataType } from './ProfileData/ProfileDataForm'

type PropsType = {
  profile: ProfileType
  status: string
  isMine: boolean
  onUpdateStatus(status: string): void
  onUploadAvatar(avatar: File): void
  onUpdateProfileData(profileData: ProfileFormDataType): Promise<boolean>
}

const ProfileInfo: React.FC<PropsType> = props => {
  const [editMode, setEditMode] = useState(false)

  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    props.onUploadAvatar(e.currentTarget.files![0])
  }

  const handleUpdateProfileData = (data: ProfileFormDataType) => {
    props.onUpdateProfileData(data).then(() => {
      setEditMode(false)
    })
  }

  if (!props.profile) return null

  return (
    <div>
      <div className={styles.profileData}>
        <img style={{ maxWidth: '500px' }} src={props.profile.photos.large || avatar} alt="" />
        {props.isMine && <input type="file" onChange={handleUploadAvatar} />}
        {props.isMine ? (
          <>
            <ProfileStatus status={props.status} updateStatus={props.onUpdateStatus} />
          </>
        ) : (
          <span>{props.status}</span>
        )}
        {editMode ? (
          <ProfileDataReduxForm
            onSubmit={handleUpdateProfileData}
            initialValues={props.profile}
            profile={props.profile}
          />
        ) : (
          <ProfileData profile={props.profile} isMine={props.isMine} onEditClick={() => setEditMode(true)} />
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
