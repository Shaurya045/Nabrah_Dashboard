import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard.tsx";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import PrivateRoute from "./Components/PrivateRoute.tsx";
import PublicRoute from "./Components/PublicRoute.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import Overview from "./Pages/dashboard/Overview.tsx";
import Agents from "./Pages/dashboard/Agents.tsx";
import Inbound from "./Pages/dashboard/Inbound.tsx";
import Outbound from "./Pages/dashboard/Outbound.tsx";
import Files from "./Pages/dashboard/Files.tsx";
import Tools from "./Pages/dashboard/Tools.tsx";
import Blocks from "./Pages/dashboard/Blocks.tsx";
import Squads from "./Pages/dashboard/Squads.tsx";
import Test from "./Pages/dashboard/Test.tsx";
import Observe from "./Pages/dashboard/Observe.tsx";
import Profile from "./Pages/dashboard/Profile.tsx";
import Settings from "./Pages/dashboard/Settings.tsx";
import Project from "./Pages/Project.tsx";
import EmailVerification from "./Pages/EmailVerification.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<PublicRoute />}>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="/verfiyEmail" element={<EmailVerification />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/project" element={<Project />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/dashboard/agents" element={<Agents />} />
          <Route path="/dashboard/inbound" element={<Inbound />} />
          <Route path="/dashboard/outbound" element={<Outbound />} />
          <Route path="/dashboard/files" element={<Files />} />
          <Route path="/dashboard/tools" element={<Tools />} />
          <Route path="/dashboard/blocks" element={<Blocks />} />
          <Route path="/dashboard/squads" element={<Squads />} />
          <Route path="/dashboard/test" element={<Test />} />
          <Route path="/dashboard/observe" element={<Observe />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/signin" replace />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
