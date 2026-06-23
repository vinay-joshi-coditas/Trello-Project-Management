import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import Dashboard from "../components/Dashboard/Dashboard";
import SuperAdminDashboard from "../components/SuperAdminDashboard/SuperAdminDashboard";

export const routes = createBrowserRouter([
    {
        Component: Dashboard,
        path: "/",
        children: [
            {
               Component: LandingPage,
               path: "/" 
            },
            {
                Component: SuperAdminDashboard,
                path: "/superadmin"
            }
        ]
    }
])