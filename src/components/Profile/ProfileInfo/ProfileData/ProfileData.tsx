import { ProfileType } from '../../../../redux/profile-reducer'
import React, { FC } from 'react'
import { Contacts } from './Contacts'

export type ProfileDataPropsType = {
  profile: ProfileType
  isMine: boolean
  onEditClick: () => void
}
export const ProfileData: FC<ProfileDataPropsType> = props => {
  if (!props.profile) return null

  return (
    <div>
      {props.isMine && (
        <button style={{ padding: '0 10px' }} onClick={() => props.onEditClick()}>
          edit
        </button>
      )}
      <h1>{props.profile.fullName}</h1>
      <p>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}</p>
      {props.profile.lookingForAJob ? <p>{props.profile.lookingForAJobDescription}</p> : undefined}
      <Contacts contacts={props.profile.contacts} />
    </div>
  )
}
