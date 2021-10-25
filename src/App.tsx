import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type  FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let tasks_1: Array<TaskType> = [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
    ]

    let [tasks, setTasks] = useState<Array<TaskType>>(tasks_1)
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks = tasks.filter(t => t.id !== taskID))
        console.log(tasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }


    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    return (

        <div className="App">
            <TodoList title='What to learn' addTask={addTask} tasks={tasksForRender} removeTask={removeTask}
                      changeFilter={changeFilter}/>
            {/*            <TodoList title = 'What to buy' tasks={tasks_1}/>
            <TodoList title = 'What to read' tasks={tasks_1}/>*/}
        </div>
    );
}

export default App;
