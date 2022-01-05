import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolist-reducer";
import {AppRootStateType} from "./store";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: '11', title: "Milk", isDone: true},
            {id: '21', title: "React Book", isDone: false}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

