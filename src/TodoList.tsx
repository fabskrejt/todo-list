import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const todoListItem = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}> x</button>
            </li>
        )

    })

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        if (title) {
            props.addTask(title)
            setTitle('')
        }

    }
    const changeFilterToAll = () => props.changeFilter('all')
    const changeFilterToActive = () => props.changeFilter('active')
    const changeFilterToCompleted = () => props.changeFilter('completed')

    return (
        <div className='todolist'>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    placeholder={'enter task'}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {todoListItem}
            </ul>
            <div>
                <button onClick={changeFilterToAll}>All</button>
                <button onClick={changeFilterToActive}>Active</button>
                <button onClick={changeFilterToCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList