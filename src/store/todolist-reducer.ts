import {TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTodolistActionType = {
    type:'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodoListAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ActionType = RemoveTodolistActionType | AddTodoListActionType | ChangeTodoListAT

export const todolistsReducer = (todoLists:Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return todoLists.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const todoList: TodoListType = {id: v1(), title: action.title, filter: "all"}
            return [...todoLists, todoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(t => t.id === action.id ? {...t, title: action.title} : t)
        default:
            return todoLists
    }

}