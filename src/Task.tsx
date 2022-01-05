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
export const Task = React.memo(({task,removeTask,changeTaskStatus,changeTaskTitle,todolistId}: TaskPropsType)=>{

    const changeInputCheck = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
    const setNewTaskTitle = (title: string) => {
        changeTaskTitle(task.id, title, todolistId)
    }

    return (
        <ListItem
            divider
            alignItems={'center'}
            dense
            className={task.isDone ? 'is-done' : ''}
            key={task.id}
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <div>
                <Checkbox
                    onChange={changeInputCheck}
                    checked={task.isDone}
                    color="default"
                />
                <EditableSpan title={task.title} setNewTitle={setNewTaskTitle}/>
            </div>
            <IconButton onClick={() => removeTask(task.id, todolistId)}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
})
