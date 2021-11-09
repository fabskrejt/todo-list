import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

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
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListID))
        delete tasks[todoListID]
    }

//UI
    const todoListsComponents = todoLists.map(t => {
        let tasksForRender: Array<TaskType> = tasks[t.id]
        if (t.filter === 'active') {
            tasksForRender = tasks[t.id].filter(t => !t.isDone )
        }
        if (t.filter === 'completed') {
            tasksForRender = tasks[t.id].filter(t => t.isDone)
        }
        return (
            <TodoList
                key={t.id}
                id={t.id}
                changeTaskStatus={changeTaskStatus}
                filter={t.filter}
                title={t.title}
                addTask={addTask}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                removeTodoList={removeTodoList}
            />
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
            {todoListsComponents}
            {/* <TodoList changeTaskStatus={changeTaskStatus} filter={filter} title='What to learn' addTask={addTask}
                      tasks={tasksForRender} removeTask={removeTask}
                      changeFilter={changeFilter}/>*/}
        </div>
    );
}


export default App;
