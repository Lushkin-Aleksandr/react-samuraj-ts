import { RootStateType } from '../../../redux/redux-store'
import { Dispatch } from 'redux'
import { addPostAC, PostType, ProfileActionType } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'
import { MyPosts } from './MyPosts'

type MapStateToPropsType = {
  posts: PostType[]
  avatar?: string
}
type MapDispatchToPropsType = {
  addPost: (postText: string) => void
}
export type MyPostsPropsType = MapStateToPropsType &
  MapDispatchToPropsType & {
    isMine: boolean
  }

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  posts: state.profilePage.posts,
  avatar: state.profilePage.profile?.photos.small,
})
const mapDispatchToProps = (dispatch: Dispatch<ProfileActionType>): MapDispatchToPropsType => ({
  addPost: (postText: string) => dispatch(addPostAC(postText)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)
