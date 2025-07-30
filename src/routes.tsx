import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("login", "pages/Login.tsx"),
  route("landing-page", "pages/LandingPage.tsx"),
] satisfies RouteConfig;
