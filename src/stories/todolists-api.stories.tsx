import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3938ec03-652e-45e2-8e89-4b9560fc50c6'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodos()
            .then((response) => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'todolistAPI 11111'

    useEffect(() => {
        todolistAPI.createTodo(title)
            .then(response => setState(response.data))
    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoId = "f2ce0f7b-54e8-451c-b880-f6a2ab90a0c4"

    useEffect(() => {
        todolistAPI.deleteTodo(todoId)
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoId = "d6c2312a-8051-4ad8-86b4-58043130974b"

    useEffect(() => {
        todolistAPI.updateTodo(todoId, 'Some new title')
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


//TasksAPI

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todoId = 'd6c2312a-8051-4ad8-86b4-58043130974b'

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTasks(todoId)
            .then((response) => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todoId = 'd6c2312a-8051-4ad8-86b4-58043130974b'
    const title = 'New task'

    useEffect(() => {
        todolistAPI.createTask(todoId, title)
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todoId = "d6c2312a-8051-4ad8-86b4-58043130974b"
    const taskId = "6245d1a9-3946-42c5-9e5f-ab6415b3080a"

    useEffect(() => {
        todolistAPI.deleteTask(todoId, taskId)
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoId = "d6c2312a-8051-4ad8-86b4-58043130974b"
    const taskId = "55b45e5b-b006-4e5b-aedf-a8edf3702e71"

    useEffect(() => {
        todolistAPI.updateTaskTitle(todoId,taskId, '====New task title====')
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}