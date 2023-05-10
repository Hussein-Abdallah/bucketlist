import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {AuthPage, IndexPage, NotFoundPage, ProtectedRoute} from './components';
import {AppContext} from './foundation';

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <AppContext>
            <Outlet />
          </AppContext>
        }
        ErrorBoundary={(error) => <div>Error: {error.message}</div>}
      >
        <Route
          index
          path="/"
          element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          }
        />
        {/* TODO: Replace the index Route with the dashboard page */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
