import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Queries from "../pages/Queries";
import MyQueries from "../pages/MyQueries";
import PrivateRoute from "../provider/PrivateRoute";
import AddQuery from "../pages/AddQuery";
import QueryDetails from "../pages/QueryDetails";
import RecommendationsForMe from "../pages/RecommendationsForMe";
import MyRecommendations from "../pages/MyRecommendations";
import UpdateQuery from "../pages/UpdateQuery";
import NotFound from "../components/NotFound";
import Authentication from "../pages/Authentication";

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
                path: "/join",
                element: <Authentication/>
            },
            {
                path: "/queries",
                element: <Queries />,
                loader: () => fetch('https://pick-better-server.vercel.app/queries')
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
            },
            {
                path: '/*',
                element: <NotFound />
            }
        ]
    },
]);

export default router;
