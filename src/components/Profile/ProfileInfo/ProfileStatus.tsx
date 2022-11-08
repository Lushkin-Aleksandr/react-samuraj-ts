import React, {ChangeEvent, MouseEvent} from 'react';
import {updateStatus} from "../../../redux/profile-reducer";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

type LocalStateType = {
    editMode: boolean
    inputValue: string
}

class ProfileStatus extends React.Component<ProfileStatusType, LocalStateType> {
    state = {
        editMode: false,
        inputValue: this.props.status
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<LocalStateType>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({inputValue: this.props.status})
        }
    }

    handleSpanDoubleClick = () => {
        this.setState({editMode: true})
    }

    handleInputBlur = () => {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.inputValue)
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.currentTarget.value})
    }

    render() {

        return (
            <div>
                {
                    !this.state.editMode
                        ? <span
                            onDoubleClick={this.handleSpanDoubleClick}>{this.props.status || 'No status'}</span>
                        : <input
                            onBlur={this.handleInputBlur}
                            onChange={this.handleInputChange}
                            value={this.state.inputValue}
                            autoFocus />
                }
            </div>
        );
    }
}

export default ProfileStatus;