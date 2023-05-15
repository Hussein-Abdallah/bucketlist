import {useAuth} from 'foundation';
import {AuthPage} from 'components/AuthPage';

export function ProtectedRoute({children}) {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <>{children}</>;
}
