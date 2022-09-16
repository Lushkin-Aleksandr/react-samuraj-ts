import React from 'react';
import styles from '../../cssModules/Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";


type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    changeNewPostText: (newPostText: string) => void
}

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <MyPosts
                addPost={props.addPost}
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                changeNewPostText={props.changeNewPostText}/>

        </div>
    );
};

export default Profile;