import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Queries from "../pages/Queries";
import MyQueries from "../pages/MyQueries";
import PrivateRoute from "../provider/PrivateRoute";
import AddQuery from "../pages/AddQuery";
import QueryDetails from "../pages/QueryDetails";
import RecommendationsForMe from "../pages/RecommendationsForMe";
import MyRecommendations from "../pages/MyRecommendations";
import UpdateQuery from "../pages/UpdateQuery";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/queries",
                element: <Queries />,
                loader: () => fetch('http://localhost:3000/queries')
            },
            {
                path: "/query-details/:id",
                element: <PrivateRoute><QueryDetails /></PrivateRoute>,

            },
            {
                path: "/add-query",
                element: <PrivateRoute><AddQuery /></PrivateRoute>
            },
            {
                path: "/my-queries",
                element: <PrivateRoute><MyQueries /></PrivateRoute>
            },
            {
                path: "/update-query/:id",
                element: <PrivateRoute><UpdateQuery /></PrivateRoute>
            },
            {
                path: "/my-recommendations",
                element: <PrivateRoute><MyRecommendations /></PrivateRoute>
            },
            {
                path: "/recommendations-for-me",
                element: <PrivateRoute><RecommendationsForMe /></PrivateRoute>
            }
        ]
    },
]);

export default router;
