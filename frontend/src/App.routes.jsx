import { createBrowserRouter, Navigate } from "react-router";

import Register from "./features/auth/Register.jsx";
import Login from "./features/auth/Login.jsx";
import Protected from "./features/auth/component/Protected.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/Interview.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/interview/:interviewId",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);