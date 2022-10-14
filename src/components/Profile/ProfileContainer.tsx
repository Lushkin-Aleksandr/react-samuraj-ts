import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {ProfileType, setProfile} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";
import axios from "axios";
import {RouteComponentProps, withRouter} from "react-router-dom";


type ParamsType = {
  userId: string
}

type MapStateToPropsType = {
  profile: ProfileType
}

export type ProfilePropsType = MapStateToPropsType & {
  setProfile: (profile: ProfileType) => void
} & RouteComponentProps<ParamsType>


class ProfileContainer extends Component<ProfilePropsType, any> {

  componentDidMount() {
    let userId = this.props.match.params.userId || '2'

    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
      this.props.setProfile(response.data)
    })

  }


  render() {
    if (!this.props.profile) return <h2>Loading...</h2>

    return (
      <Profile profile={this.props.profile}/>
    );
  }
}


const mapStateToProps = (state: StateType): MapStateToPropsType => ({
  profile: state.profilePage.profile
})

const ProfileContainerWithUrlData = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setProfile})(ProfileContainerWithUrlData);