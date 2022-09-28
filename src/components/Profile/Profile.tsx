import React from 'react';
import styles from '../../cssModules/Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPosts";


type ProfilePropsType = {
}

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>

        </div>
    );
};

export default Profile;