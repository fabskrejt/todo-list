import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@material-ui/core";
export type AddItemFormType = {
    addItemCallback:(trimmedTitle:string) => void

}

export const AddItemForm=(props: AddItemFormType)=>{
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const errorMessage = error
        ? <div style={{color: 'red'}}>Title is required</div>
        : null

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItemCallback(trimmedTitle)
            setTitle('')
        } else {
            setError(true)
        }
        setTitle('')
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value != ' ') {
            setTitle(event.currentTarget.value)
            setError(false)
        } else {
            setError(true)
        }
    }

        const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                addTask()
            }
        }

    return(
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                placeholder={'enter task'}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
            />
            <button onClick={addTask}>+</button>
            <Button onClick={addTask} variant={"contained"}>+</Button>
            {errorMessage}
        </div>
    )
}
