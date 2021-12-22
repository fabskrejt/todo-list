import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodolistAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodolistAC} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type  TasksStateType = {
    [key: string]: Array<TaskType>
}

export type  FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {

        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)

    },[ dispatch])
    const addTask =useCallback( (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    },[dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListID))
    },[dispatch])
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    },[dispatch])
    const changeFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todoListID))
    },[dispatch])
    const changeTaskTitle = useCallback((taskID: string, taskTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, taskTitle, todoListID))
    },[dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodolistAC(todoListID)
        dispatch(action)
    },[dispatch])
    const addTodoList = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    },[dispatch])


//UI
    const todoListsComponents = todoLists.map(t => {
        let tasksForRender: Array<TaskType> = tasks[t.id]
        if (t.filter === 'active') {
            tasksForRender = tasks[t.id].filter(t => !t.isDone)
        }
        if (t.filter === 'completed') {
            tasksForRender = tasks[t.id].filter(t => t.isDone)
        }
        return (
            <Grid item key={t.id}>
                <Paper elevation={7} style={{padding: '20px'}}>
                    <TodoList
                        id={t.id}
                        changeTaskStatus={changeTaskStatus}
                        filter={t.filter}
                        title={t.title}
                        addTask={addTask}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (

        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '29px 0'}}>
                    <AddItemForm addItemCallback={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
