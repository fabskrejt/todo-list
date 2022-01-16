import axios from "axios";
import {UpdateTaskTitle} from "../stories/todolists-api.stories";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        'API-KEY': '3938ec03-652e-45e2-8e89-4b9560fc50c6'
    }
})

export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodolistType>>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string) {
        return instance.put<ResponseType<{}>>(`/todo-lists/${todoId}`, {title})
    },
    //Tasks methods
    getTasks(todolistId: string) {
        return instance.get<Array<TaskType>>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}

type TodolistType = {
    id: string,
    title: string,
    "addedDate": string,
    "order": number
}

export type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
/*type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateAndDeleteTodolistResponseType = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: {}
}*/

//Types for tasks api
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

/*
type  CreateTaskResponseType = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: {
        item: TaskType
    }
}

type UpdateTaskResponseType = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: {
        item: TaskType
    }
}

type DeleteTaskResponseType = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: {}
}*/
