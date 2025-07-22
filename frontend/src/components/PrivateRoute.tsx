// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Carregando...</div>;
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;