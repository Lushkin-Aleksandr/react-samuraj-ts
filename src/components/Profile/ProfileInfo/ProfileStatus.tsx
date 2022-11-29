import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatus: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(props.status)

    useEffect(() => {
        setInputValue(props.status)
    }, [props.status])

    const handleSpanDoubleClick = () => {
        setEditMode(true)
    }
    const handleInputBlur = () => {
        setEditMode(false)
        props.updateStatus(inputValue)
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <div>
            {
                !editMode
                    ? <span
                        onDoubleClick={handleSpanDoubleClick}>{props.status || 'There is no status'}</span>
                    : <input
                        onBlur={handleInputBlur}
                        onChange={handleInputChange}
                        value={inputValue}
                        autoFocus/>
            }
        </div>
    )
}

export default ProfileStatus