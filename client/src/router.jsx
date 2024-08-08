import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import MainLayout from './pages/MainLayout';
import Detail from './pages/Detail';

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
        element: <MainLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                return redirect('/login');
            }

            return null;
        },
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'items/:itemId',
                element: <Detail />
            }
        ]
    }
]);

export default router;