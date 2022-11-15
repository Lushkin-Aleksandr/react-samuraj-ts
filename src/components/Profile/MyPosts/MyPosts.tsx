import React from 'react';
import Post from "./Post/Post";
import styles from '../Profile.module.css'
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators";
import Textarea from "../../../common/Textarea/Textarea";


const maxLength20Validator = maxLengthCreator(20);

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const postElements: JSX.Element[] = props.posts.map(p => {
        return <Post
            key={p.id}
            postText={p.postText}
            likesCount={p.likesCount}/>
    })

    const addPost = (data: FormDataType) => props.addPost(data.postText)


    return (
        <div className={styles.myPosts}>
            <h2 className={styles.myPostsTitle}>My posts</h2>
            <AddPostFormWithRedux onSubmit={addPost}/>
            {postElements}
        </div>
    );
};


type FormDataType = {
    postText: string
}


const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={styles.addPostForm}>
            <div>
                <Field
                    className={styles.addPostText}
                    name={'postText'}
                    component={Textarea}
                    placeholder={'Type text for your new post...'}
                    validate={[requiredField, maxLength20Validator]}/>
            </div>
            <div>
                <button className={styles.addPostBtn}>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormWithRedux = reduxForm<FormDataType>({form: 'addPost'})(AddPostForm)
