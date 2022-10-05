import {connect} from "react-redux";
import React from "react";
import {
    changeNewMessageTextAC,
    DialogsActionTypes,
    DialogsPageType,
    DialogType, MessageType,
    sendMessageAC
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
}
type MapDispatchToPropsType = {
    sendMessage: () => void
    changeNewMessageText: (newMessageText: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType









const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText
})

const mapDispatchToProps = (dispatch: Dispatch<DialogsActionTypes>): MapDispatchToPropsType => ({
    changeNewMessageText: (newMessageText: string) => dispatch(changeNewMessageTextAC(newMessageText)),
    sendMessage: () => dispatch(sendMessageAC())
})

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)