import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
/*import {AddItemForm} from "./AddItemForm";*/

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
}

const TodoList = (props: TodoListPropsType) => {
    const todoListItem = props.tasks.map(t => {
        const changeInputCheck = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        return (
            <li
                className={t.isDone ? 'is-done' : ''}
                key={t.id}>
                <input
                    onChange={changeInputCheck}
                    type="checkbox"
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id, props.id)}> x</button>
            </li>
        )

    })

    const addTask = (trimmedTitle: string) => {
        props.addTask(trimmedTitle, props.id)
    }
    const changeFilterToAll = () => props.changeFilter('all', props.id)
    const changeFilterToActive = () => props.changeFilter('active', props.id)
    const changeFilterToCompleted = () => props.changeFilter('completed', props.id)
    const allButtonClass = props.filter === 'all' ? 'active-filter' : ''
    const activeButtonClass = props.filter === 'active' ? 'active-filter' : ''
    const completedButtonClass = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div className='todolist'>
            <h3>
                {props.title}
                <button onClick={() => props.removeTodoList(props.id)}>-</button>
            </h3>
            <AddItemForm addItemCallback={addTask}/>
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
