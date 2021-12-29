import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type TaskPropsType ={
    task: TaskType
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, taskTitle: string, todoListID: string) => void

}
/*
export const Task = React.memo((props: TaskPropsType)=>{

    const changeInputCheck = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
    const setNewTaskTitle = (title: string) => {
        props.changeTaskTitle(t.id, title, props.id)
    }


    return (
        <ListItem
            divider
            alignItems={'center'}
            dense
            className={t.isDone ? 'is-done' : ''}
            key={t.id}
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <div>
                <Checkbox
                    onChange={changeInputCheck}
                    checked={t.isDone}
                    color="default"

                />
                <EditableSpan title={t.title} setNewTitle={setNewTaskTitle}/>
            </div>
            <IconButton onClick={() => props.removeTask(t.id, props.id)}>
                <Delete/>
            </IconButton>
            {/!*              <button onClick={() => props.removeTask(t.id, props.id)}> x</button>*!/}
        </ListItem>
    )
})*/
