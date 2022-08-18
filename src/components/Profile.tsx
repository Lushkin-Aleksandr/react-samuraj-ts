import React from 'react';
import styles from '../cssModules/Profile.module.css'

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
            <div>
                My posts
                <div>
                    New post
                </div>
                <div>post 1</div>
                <div>post 2</div>
            </div>

        </div>
    );
};

export default Profile;