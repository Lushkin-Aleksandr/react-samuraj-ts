import React from 'react';
import styles from '../../cssModules/Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPosts";
import {StoreType} from "../../redux/redux-store";


type ProfilePropsType = {
    store: StoreType
}

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPostsContainer
                store={props.store}/>

        </div>
    );
};

export default Profile;