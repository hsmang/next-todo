import React from "react";
import { GetServerSideProps, NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import Axios from "axios";
import { getTodosAPI } from "../lib/api/todo";
import { wrapper } from "../store";
import { todoActions } from "../store/todo";

// interface IProps {
//     todos: TodoType[];
// }

// const app: NextPage<IProps> = ({ todos }) => {

//     console.log(process.env.NEXT_PUBLIC_API_URL, "클라이언트");
//     return <TodoList todos={todos} />;

// };

const app: NextPage = () => {
    return <TodoList />;
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store }) => {
        console.log("store");
        console.log(store);
        try {
            const { data } = await getTodosAPI();
            store.dispatch(todoActions.setTodo(data));
            console.log("data : ");
            console.log(data);
            return { props: {} };
        } catch (e) {
            console.log(e);
            return { props: {} };
        }
    }
)

export default app;