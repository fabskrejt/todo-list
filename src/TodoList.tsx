import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
                {/*              <button onClick={() => props.removeTask(t.id, props.id)}> x</button>*/}
            </ListItem>
        )
    })

    const addTask = useCallback((trimmedTitle: string) => {
        props.addTask(trimmedTitle, props.id)
    }, [props.addTask, props.id])
    const changeFilterToAll = () => props.changeFilter('all', props.id)
    const changeFilterToActive = () => props.changeFilter('active', props.id)
    const changeFilterToCompleted = () => props.changeFilter('completed', props.id)
    const allButtonClass = props.filter === 'all' ? 'active-filter' : ''
    const activeButtonClass = props.filter === 'active' ? 'active-filter' : ''
    const completedButtonClass = props.filter === 'completed' ? 'active-filter' : ''
    const setNewTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

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
