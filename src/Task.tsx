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
    todolistId: string

}
export const Task = React.memo((props: TaskPropsType)=>{

    const changeInputCheck = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    const setNewTaskTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }


    return (
        <ListItem
            divider
            alignItems={'center'}
            dense
            className={props.task.isDone ? 'is-done' : ''}
            key={props.task.id}
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <div>
                <Checkbox
                    onChange={changeInputCheck}
                    checked={props.task.isDone}
                    color="default"

                />
                <EditableSpan title={props.task.title} setNewTitle={setNewTaskTitle}/>
            </div>
            <IconButton onClick={() => props.removeTask(props.task.id, props.todolistId)}>
                <Delete/>
            </IconButton>
            {/*              <button onClick={() => props.removeTask(t.id, props.id)}> x</button>*/}
        </ListItem>
    )
})
