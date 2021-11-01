import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const todoListItem = props.tasks.map(t => {
        const changeInputCheck = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li
                className={t.isDone ? 'is-done' : ''}
                key={t.id}>
                <input
                    onChange={changeInputCheck}
                    type="checkbox"
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}> x</button>
            </li>
        )

    })

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value != ' ') {
            setTitle(event.currentTarget.value)
            setError(false)
        } else {
            setError(true)
        }

    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
            setTitle('')
        } else {
            setError(true)
        }
        setTitle('')
    }
    const changeFilterToAll = () => props.changeFilter('all')
    const changeFilterToActive = () => props.changeFilter('active')
    const changeFilterToCompleted = () => props.changeFilter('completed')
    const allButtonClass = props.filter === 'all' ? 'active-filter' : ''
    const activeButtonClass = props.filter === 'active' ? 'active-filter' : ''
    const completedButtonClass = props.filter === 'completed' ? 'active-filter' : ''
    const errorMessage = error
        ? <div style={{color: 'red'}}>Title is required</div>
        : null
    return (
        <div className='todolist'>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    placeholder={'enter task'}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {todoListItem}
            </ul>
            <div>
                <button
                    className={allButtonClass}
                    onClick={changeFilterToAll}>All
                </button>
                <button
                    className={activeButtonClass}
                    onClick={changeFilterToActive}>Active
                </button>
                <button
                    className={completedButtonClass}
                    onClick={changeFilterToCompleted}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList