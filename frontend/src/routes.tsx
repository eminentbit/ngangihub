import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/welcome.page";
import NotFoundPage from "./pages/not-found";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <WelcomePage/>,
        errorElement: <NotFoundPage/>
    }
    
])