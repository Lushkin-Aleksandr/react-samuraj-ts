import React from 'react';
import styles from "../../../cssModules/Profile.module.css";
import {ProfileType} from "../../../redux/profile-reducer";
import avatar from '../../../assets/images/avatar.png'




type PropsType = {
  profile: ProfileType
}

const ProfileInfo: React.FC<PropsType> = (props) => {
  if (!props.profile) return null

    return (
        <div>
            <div className={styles.profileData}>
              <img style={{maxWidth: '500px'}} src={props.profile.photos.large || avatar} alt=""/>
              <h1>{props.profile.fullName}</h1>

            </div>
        </div>
    );
};

export default ProfileInfo;