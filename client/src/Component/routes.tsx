import { lazy } from "react";
const HomeElement = lazy(() => import('./home'));
const ProfileElement = lazy(() => import('./profile'));
const DashboardElement = lazy(() => import('./dashboard'));
const SignupElement = lazy(() => import('./signup'));
const LoginElement = lazy(() => import('./login'));
const BlogElement = lazy(() => import('./blog'));


const routes = [
    { path: '/home' || '', element: <HomeElement /> },
    { path: '/profile', element: <ProfileElement /> },
    { path: '/', element: <DashboardElement /> },
    { path: '/signup', element: <SignupElement /> },
    { path: '/login', element: <LoginElement /> },
    { path: '/blog', element: <BlogElement /> },

  ]
  export default routes