import { lazy } from "react";
import { Navigate } from "react-router-dom";
const HomeElement = lazy(() => import("./home"));
const ProfileElement = lazy(() => import("./profile"));
const DashboardElement = lazy(() => import("./dashboard"));
const SignupElement = lazy(() => import("./signup"));
const LoginElement = lazy(() => import("./login"));
const BlogElement = lazy(() => import("./blog"));
const CreateBlogElement = lazy(() => import("./createBlog"));
const MyBlogElement = lazy(() => import("./myblog"));
const BookmarkElement = lazy(() => import("./bookmarks"));
const MyPostElement = lazy(() => import("./myPost"));

export const publicRoutes = [
  { path: "/login", element: <LoginElement /> },
  { path: "/home" || "", element: <HomeElement /> },
  { path: "/", element: <DashboardElement /> },
  { path: "/signup", element: <SignupElement /> },
  // { path: "*", element: <Navigate to="/" /> },
];
export const privateRoutes = [
  { path: "/profile", element: <ProfileElement /> },
  { path: "/blog", element: <BlogElement /> },
  { path: "/create", element: <CreateBlogElement /> },
  { path: "/myblog", element: <MyBlogElement /> },
  { path: "/bookmark", element: <BookmarkElement /> },
  { path: "/my-posts", element: <MyPostElement /> },
  { path: " ", element: <Navigate to="/" /> },
];

// export default routes
