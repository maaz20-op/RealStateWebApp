import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminRoute from "../components/common/AdminRoute";

const Home = lazy(() => import("../pages/Home"));
const Properties = lazy(() => import("../pages/Properties"));
const PropertyDetails = lazy(() => import("../pages/PropertyDetails"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const CreateProperty = lazy(() => import("../pages/CreateProperty"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/properties", element: <Properties /> },
      { path: "/property/details/:id", element: <PropertyDetails /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/create", element: <ProtectedRoute><AdminRoute><CreateProperty /></AdminRoute></ProtectedRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default router;
