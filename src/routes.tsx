import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Navigate,
} from "@tanstack/react-router";
import React from "react";
import { Outlet } from "@tanstack/react-router";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Default child route: redirects to /login
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/login" />,
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

// Landing page route
const landingPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/landing-page/$userId/$email",
  component: LandingPage,
});

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  landingPageRoute,
]);

// Create router
export const router = createRouter({ routeTree });

// Type registration
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// App with router provider
export function App() {
  return <RouterProvider router={router} />;
}
