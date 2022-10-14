import React from 'react';
import styles from '../../cssModules/Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";


type PropsType = {
  profile: ProfileType
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;