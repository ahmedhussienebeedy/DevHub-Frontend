
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ======================================
// Layouts
// ======================================
import MainLayout from "./Layout/MainLayout";

// ======================================
// Public Pages
// ======================================
import Home from "./Components/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

// ======================================
// Client Pages
// ======================================
import ClientDashboard from "./Pages/Dashboard/ClientDashboard";
import CreateProject from "./Pages/Projects/CreateProject";
import EditProject from "./Pages/Projects/EditProject";
import Applicants from "./Pages/Projects/Applicants";

// ======================================
// Freelancer Pages
// ======================================
import FreelancerDashboard from "./Pages/Dashboard/FreelancerDashboard";
import FreelancerProjectDetails from "./Pages/Projects/FreelancerProjectDetails";
import MyApplications from "./Pages/Projects/MyApplications";
import MyWork from "./Pages/Projects/MyWork";

// ======================================
// Project Pages
// ======================================
import ProjectDetails from "./Pages/Projects/ProjectDetails";

// ======================================
// Other Pages
// ======================================
import Notifications from "./Pages/Notifications/Notifications";
import Checkout from "./Pages/Payment/Checkout";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";

// ======================================
// Chat
// ======================================
import Chat from "./Pages/Chat/Chat";

// ======================================
// Routes
// ======================================
import ProtectedRoute from "./Components/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute";
import RoleRoute from "./RoleRoute/RoleRoute";

// ======================================
// Router
// ======================================

const router = createBrowserRouter([
  // ======================================
  // Main Layout
  // ======================================
  {
    element: <MainLayout />,

    children: [
      // ======================================
      // Home
      // ======================================
      {
        path: "/",
        element: <Home />,
      },

      // ======================================
      // Public Project Details
      // ======================================
      {
        path: "/projects/:id",
        element: <ProjectDetails />,
      },

      // ======================================
      // Guest Routes
      // ======================================
      {
        element: <GuestRoute />,

        children: [
          {
            path: "/login",
            element: <Login />,
          },

          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      // ======================================
      // Client Routes
      // ======================================
      {
        element: <ProtectedRoute />,

        children: [
          {
            element: <RoleRoute roles={["client"]} />,

            children: [
              {
                path: "/client",
                element: <ClientDashboard />,
              },

              {
                path: "/client/create-project",
                element: <CreateProject />,
              },

              {
                path: "/client/edit-project/:id",
                element: <EditProject />,
              },

              // ======================================
              // Applicants
              // ======================================
              {
                path: "/client/projects/:id/applications",
                element: <Applicants />,
              },

              // ======================================
              // Payment
              // ======================================
              {
                path: "/payment/:id",
                element: <Checkout />,
              },

              {
                path: "/payment-success",
                element: <PaymentSuccess />,
              },
            ],
          },
        ],
      },

      // ======================================
      // Freelancer Routes
      // ======================================
      {
        element: <ProtectedRoute />,

        children: [
          {
            element: <RoleRoute roles={["freelancer"]} />,

            children: [
              {
                path: "/freelancer",
                element: <FreelancerDashboard />,
              },

              {
                path: "/freelancer/applications",
                element: <MyApplications />,
              },

              {
                path: "/freelancer/work",
                element: <MyWork />,
              },

              {
                path: "/freelancer/project/:id",
                element: <FreelancerProjectDetails />,
              },
            ],
          },
        ],
      },

      // ======================================
      // Notifications
      // ======================================
      {
        element: <ProtectedRoute />,

        children: [
          {
            element: (
              <RoleRoute
                roles={["client", "freelancer"]}
              />
            ),

            children: [
              {
                path: "/notifications",
                element: <Notifications />,
              },
            ],
          },
        ],
      },

      // ======================================
      // Chat Routes
      // ======================================
      {
        element: <ProtectedRoute />,

        children: [
          {
            element: (
              <RoleRoute
                roles={["client", "freelancer"]}
              />
            ),

            children: [
              {
                path: "/project/:id/chat",
                element: <Chat />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

// ======================================
// App
// ======================================

export default function App() {
  return <RouterProvider router={router} />;
}

