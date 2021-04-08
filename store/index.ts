import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore,  combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as useReduxSelector, } from "react-redux";
import todo from "./todo";

const rootReducer = combineReducers({
    todo: todo.reducer,
})

export const useSelector : TypedUseSelectorHook<RootState> = useReduxSelector;

//* 타입 지원되는 커스텀 useSelector 만들기
declare module 'react-redux' {
    interface DefaultRootState extends RootState {}
}

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        if(state.count) nextState.count = state.count;
        return nextState;
    }
    return rootReducer(state, action);
}

//* 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

//* 미들웨어 적용을 위한 스토어 enhancer
// const bindMiddleware = (middleware: any) => {
//     if (process.env.NODE_ENV !== "production") {
//         const { composeWithDevTools } = require("redux-devtools-extension");
//         return composeWithDevTools(applyMiddleware(...middleware));
//     }
//     return applyMiddleware(...middleware);
// }

const initStore = () => {
    return configureStore({
        reducer,
        devTools: true,
    })
};

export const wrapper = createWrapper(initStore);