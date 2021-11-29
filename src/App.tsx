import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type  TasksStateType = {
    [key: string]: Array<TaskType>
}

export type  FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: "all"},
        {id: todoListID_2, title: 'What to buy', filter: "all"},
    ])


    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
        ]
    })


    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})

    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, filter} : t))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, title} : t))
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }

    const changeTaskTitle = (taskID: string, taskTitle: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: taskTitle} : t)})
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListID))
        delete tasks[todoListID]
    }

    const addTodoList = (title: string) => {
        const todoList: TodoListType = {id: v1(), title: title, filter: "all"}
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.id]: []})
    }


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

    /* let tasksForRender = tasks
     if (filter === 'active') {
         tasksForRender = tasks.filter(t => t.isDone === false)
     }
     if (filter === 'completed') {
         tasksForRender = tasks.filter(t => t.isDone === true)
     }*/

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
            {/* <TodoList changeTaskStatus={changeTaskStatus} filter={filter} title='What to learn' addTask={addTask}
                      tasks={tasksForRender} removeTask={removeTask}
                      changeFilter={changeFilter}/>*/}
        </div>
    );
}


export default App;
