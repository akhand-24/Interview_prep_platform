import { createBrowserRouter } from "react-router";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import Protected from "./features/auth/component/Protected.jsx";

export const router =createBrowserRouter([
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/register",
        element: <Register/>
    },
    {
        path:"/",
        element: <Protected> <h1>Home Page</h1> </Protected>
    }
])