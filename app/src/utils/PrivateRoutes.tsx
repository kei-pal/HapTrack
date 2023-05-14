import { Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

const PrivateRoutes = () => {
  const token = localStorage.getItem('token');
  const isAuth = !!token;

  return (
    isAuth ? <Layout /> : <Navigate to="/login" />
  );
};

export default PrivateRoutes;