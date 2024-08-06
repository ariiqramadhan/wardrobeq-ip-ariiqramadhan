import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

const router = createBrowserRouter([
    {
        path: '/register',
        element: <Register />,
        loader: () => {
            if (localStorage.access_token) {
                return redirect('/');
            }

            return null;
        }
    },
    {
        path: '/login',
        element: <Login />,
        loader: () => {
            if (localStorage.access_token) {
                return redirect('/');
            }

            return null;
        }
    },
    {
        path: '/',
        element: <Home />,
        loader: () => {
            if (!localStorage.access_token) {
                return redirect('/login');
            }

            return null;
        }
    }
]);

export default router;