import {connect} from "react-redux";
import React from "react";
import {DialogsActionTypes, DialogType, MessageType, sendMessageAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStateToPropsType = {
    dialogs: DialogType[]
    messages: MessageType[]
}
type MapDispatchToPropsType = {
    sendMessage: (messageText: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType



const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
})

const mapDispatchToProps = (dispatch: Dispatch<DialogsActionTypes>): MapDispatchToPropsType => ({
    sendMessage: (messageText: string) => dispatch(sendMessageAC(messageText))
})

export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))