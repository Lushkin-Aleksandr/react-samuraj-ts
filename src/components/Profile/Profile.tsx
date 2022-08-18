import React from 'react';
import styles from '../../cssModules/Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={styles.profile}>
            <div>
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt=""
                     className={styles.profileImg}/>
            </div>
            <div>
                ava + description
            </div>
            <MyPosts/>

        </div>
    );
};

export default Profile;