import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  AuthPage,
  CategoriesList,
  Category,
  IndexPage,
  NotFoundPage,
  ProtectedRoute,
} from './components';
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
          element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          }
        >
          <Route index path="/" element={<CategoriesList />} />
          <Route path="/category/:id" element={<Category />} />
        </Route>
        {/* TODO: Replace the index Route with the dashboard page */}
        <Route path="/auth" element={<AuthPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
