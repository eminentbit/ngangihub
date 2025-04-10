import { createBrowserRouter } from "react-router-dom";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1 className="text-3xl font-bold underline">Hello world!</h1>,
        errorElement: <h1 className="text-3xl font-bold underline">Error</h1>,

    }
    
])