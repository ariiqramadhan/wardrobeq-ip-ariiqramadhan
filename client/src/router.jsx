import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from './pages/Login';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        loader: () => {
            if (localStorage.access_token) {
                return redirect('/');
            }

            return null;
        }
    }
]);

export default router;