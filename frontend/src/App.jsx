import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {AuthPage, IndexPage, NotFoundPage} from './components';

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Outlet />}
        ErrorBoundary={(error) => <div>Error: {error.message}</div>}
      >
        <Route index path="/" element={<AuthPage />} />
        {/* TODO: Replace the index Route with the dashboard page */}
        <Route path="/dashboard" element={<IndexPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
