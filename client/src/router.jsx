import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import MainLayout from './pages/MainLayout';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import CategoryItems from './pages/CategoryItems';

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
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'add-item',
                element: <AddItem />
            },
            {
                path: 'items/:itemId/edit',
                element: <EditItem />
            },
            {
                path: '/category/:catId',
                element: <CategoryItems />
            }
        ]
    }
]);

export default router;