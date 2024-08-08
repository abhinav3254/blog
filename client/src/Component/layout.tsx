import { Suspense } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from 'react-router-dom';
import { RootState } from "../store";
import { privateRoutes, publicRoutes } from './routes';

const Layout = () => {
  const  loggedIn =  useSelector((state: RootState) => state.App.loggedIn);
  let routes = loggedIn ? [...privateRoutes,...publicRoutes]:publicRoutes
    const AppRoutes = () => {
        return useRoutes(routes);
      };

  return (
    <div className="layout">
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
     </Suspense>
     
    </div>
  )
}

export default Layout