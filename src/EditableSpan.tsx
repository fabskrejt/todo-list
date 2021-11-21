import React, {useState} from "react";

export type EditableSpanPropsType = {
    title: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const editModeOn = () => setEditMode(true)
    const editModeOff = () => setEditMode(false)
    return (
        editMode
            ? <input onBlur={editModeOff} autoFocus={true}/>
            : <span onDoubleClick={editModeOn}>{props.title}</span>
    )
}