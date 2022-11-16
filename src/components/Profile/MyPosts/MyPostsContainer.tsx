import {StateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {addPostAC, PostType, ProfileActionType} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";

type MapStateToPropsType = {
    posts: PostType[]
}
type MapDispatchToPropsType = {
    addPost: (postText: string) => void
}
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType








const mapStateToProps = (state: StateType):MapStateToPropsType => ({
    posts: state.profilePage.posts,
})
const mapDispatchToProps = (dispatch: Dispatch<ProfileActionType>): MapDispatchToPropsType => ({
    addPost: (postText: string) => dispatch(addPostAC(postText)),
})

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);