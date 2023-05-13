import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const token = localStorage.getItem('token');
  const isAuth = !!token;

  return (
    isAuth ? <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoutes;