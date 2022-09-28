import React from 'react';
import styles from '../../cssModules/Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionTypes, ProfilePageType} from "../../redux/store";


type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionTypes) => void
}

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPosts
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                dispatch={props.dispatch}/>

        </div>
    );
};

export default Profile;