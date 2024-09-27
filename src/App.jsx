import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import StaticPage from './pages/StaticPage';
import AmbientPage from './pages/AmbientPage';
import MidiPage from './pages/MidiPage';
import SettingsPage from './pages/SettingsPage.jsx';
import SetupLayout from './layout/SetupLayout';

const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <StaticPage />,
            },
            {
                path: '/ambient',
                element: <AmbientPage />,
            },
            {
                path: '/midi',
                element: <MidiPage />,
            },
            {
                path: '/settings',
                element: <SettingsPage />,
            },
            {
                path: '*',
                element: <h1>404 - Page Not Found</h1>,
            },
        ],
    },
    {
        path: '/setup',
        element: <SetupLayout />,
    },
]);

function App() {
    return <RouterProvider router={router} basename='/app' />;
}

export default App;
