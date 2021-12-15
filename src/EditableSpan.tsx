import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState<string>('')
    const editModeOn = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const editModeOff = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }

    return (
        editMode
            ? <TextField
                value={title}
                onBlur={editModeOff}
                onChange={changeTitle}
                autoFocus={true}
            />
                /*? <input value={title} onBlur={editModeOff} onChange={changeTitle} autoFocus={true}/>*/
                : <span onDoubleClick={editModeOn}>{props.title}</span>
    )
}