import React, { Component } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import {
  getProfile,
  getStatus,
  ProfileType,
  updateProfileData,
  updateStatus,
  uploadAvatar,
} from '../../redux/profile-reducer'
import { RootStateType } from '../../redux/redux-store'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { ProfileFormDataType } from './ProfileInfo/ProfileData/ProfileDataForm'

type ParamsType = {
  userId: string
}

type MapStateToPropsType = {
  profile: ProfileType
  status: string
  isAuth: boolean
  userId: string | null
}

export type ProfilePropsType = MapStateToPropsType & {
  getProfile(userId: number): void
  getStatus(userId: number): void
  updateStatus(status: string): void
  uploadAvatar(avatar: File): void
  updateProfileData(profileData: ProfileFormDataType): Promise<boolean>
} & RouteComponentProps<ParamsType>

class ProfileContainer extends Component<ProfilePropsType, any> {
  refreshProfile() {
    let userId = this.props.match.params.userId
    let authorizedUserId = this.props.userId

    if (userId) {
      this.props.getProfile(+userId)
      this.props.getStatus(+userId)
    } else if (!userId && authorizedUserId) {
      this.props.getProfile(+authorizedUserId)
      this.props.getStatus(+authorizedUserId)
    } else {
      this.props.history.push('/login')
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: Readonly<ProfilePropsType>) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    if (!this.props.profile) return <h2>Loading...</h2>

    return (
      <Profile
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        uploadAvatar={this.props.uploadAvatar}
        updateProfileData={this.props.updateProfileData}
        isMine={this.props.isAuth && !this.props.match.params.userId}
      />
    )
  }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getProfile, getStatus, updateStatus, uploadAvatar, updateProfileData }),
  withRouter,
)(ProfileContainer)
