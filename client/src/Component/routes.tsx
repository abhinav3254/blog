import { lazy } from "react";
const HomeElement = lazy(() => import('./home'));
const ProfileElement = lazy(() => import('./profile'));
const routes = [
    { path: '/home' || '', element: <HomeElement /> },
    { path: '/profile', element: <ProfileElement /> },
  ]
  export default routes