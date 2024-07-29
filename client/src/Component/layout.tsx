import { Suspense } from "react";
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const layout = () => {
    const AppRoutes = () => {
        return useRoutes(routes);;
      };
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
     </Suspense>
    </div>
  )
}

export default layout