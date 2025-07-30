import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import { Outlet } from "@tanstack/react-router";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Child routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const landingPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/landing-page",
  component: LandingPage,
});

// Route tree
const routeTree = rootRoute.addChildren([loginRoute, landingPageRoute]);

export const router = createRouter({ routeTree });

// Type registration (important)
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Provide router to app
export function App() {
  return <RouterProvider router={router} />;
}
