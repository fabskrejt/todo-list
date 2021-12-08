import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";


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


export type ActionType = RemoveTaskActionType | AddTaskActionType

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
