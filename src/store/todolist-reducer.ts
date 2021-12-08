import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}

export type ChangeTodoListAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodolistActionType | AddTodoListActionType | ChangeTodoListAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const todoList: TodoListType = {id: action.todolistID, title: action.title, filter: "all"}
            return [...todoLists, todoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return todoLists
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistID: v1(),
    }
}


export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title,
    }
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter,
    }
}
