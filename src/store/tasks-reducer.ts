import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}

export type secondTodolistAC = {
    type: ''
}


export type ActionType = RemoveTaskActionType | secondTodolistAC

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].
                filter(task => task.id !== action.taskID)}
        case '':
            return state
          default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todoListID }
}

export const secondTodolistAC = (title: string, id: string): secondTodolistAC => {
    return {
        type: '',
    }
}
