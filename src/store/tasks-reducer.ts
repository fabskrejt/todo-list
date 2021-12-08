import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType} from "./todolist-reducer";


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    taskTitle: string
    todoListID: string
}


export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .filter(task => task.id !== action.taskID)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskID ? {...task, isDone: action.isDone} : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskID ? {...task, title: action.taskTitle} : task)
            }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todoListID}
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todoListID}
}
export const changeTaskTitleAC = (taskID: string, taskTitle: string, todoListID: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, taskTitle, todoListID}
}
