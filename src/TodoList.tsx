import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTodoList: (todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, taskTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('todolist')

    let tasksForRender = props.tasks
    if (props.filter === 'active') {
        tasksForRender = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForRender = props.tasks.filter(t => t.isDone)
    }


    const todoListItem = tasksForRender.map(t => {
        return <Task task={t}
                     removeTask={props.removeTask}
                     changeTaskStatus={props.changeTaskStatus}
                     changeTaskTitle={props.changeTaskTitle}
                     todolistId={props.id}
                     key={t.id}
        />
    })

    const addTask = useCallback((trimmedTitle: string) => {
        props.addTask(trimmedTitle, props.id)
    }, [props.addTask, props.id])
    const changeFilterToAll = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const changeFilterToActive = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const changeFilterToCompleted = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])
    const allButtonClass = props.filter === 'all' ? 'active-filter' : ''
    const activeButtonClass = props.filter === 'active' ? 'active-filter' : ''
    const completedButtonClass = props.filter === 'completed' ? 'active-filter' : ''
    const setNewTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])

    return (
        <div className='todolist'>
            <Typography variant={'h6'} style={{fontWeight: 'bold', color: 'rgb(57, 79, 79)'}}>
                <EditableSpan title={props.title} setNewTitle={setNewTodolistTitle}/>
                <IconButton
                    edge={'end'}
                    size={'small'}
                    onClick={() => props.removeTodoList(props.id)}
                >
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItemCallback={addTask}/>
            <List>
                {todoListItem}
            </List>
            <div>
                <ButtonGroup variant={'contained'} size={'small'} fullWidth>
                    <Button
                        className={allButtonClass}
                        onClick={changeFilterToAll}>All
                    </Button>
                    <Button
                        className={activeButtonClass}
                        onClick={changeFilterToActive}>Active
                    </Button>
                    <Button
                        className={completedButtonClass}
                        onClick={changeFilterToCompleted}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

export default TodoList
