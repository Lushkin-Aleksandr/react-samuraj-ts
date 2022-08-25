import React from 'react';
import styles from '../../cssModules/Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPosts/>

        </div>
    );
};

export default Profile;