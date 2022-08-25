import React from 'react';
import styles from "../../../cssModules/Profile.module.css";

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt=""
                     className={styles.profileImg}/>
            </div>
            <div className={styles.profileData}>
                ava + description
            </div>
        </div>
    );
};

export default ProfileInfo;