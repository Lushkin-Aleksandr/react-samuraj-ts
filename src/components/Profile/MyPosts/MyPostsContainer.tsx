import {StateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {
    addPostAC,
    changeNewPostTextAC,
    PostType,
    ProfileActionTypes,
    ProfilePageType
} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";

type MapStateToPropsType = {
    posts: PostType[]
    newPostText: string
}
type MapDispatchToPropsType = {
    addPost: () => void
    changeNewPostText: (newPostText: string) => void
}
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType








const mapStateToProps = (state: StateType): ProfilePageType => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
})
const mapDispatchToProps = (dispatch: Dispatch<ProfileActionTypes>) => ({
    addPost: () => dispatch(addPostAC()),
    changeNewPostText: (newPostText: string) => dispatch(changeNewPostTextAC(newPostText))
})

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);