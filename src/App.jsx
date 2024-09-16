import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import StaticPage from './pages/StaticPage';
import AmbientPage from './pages/AmbientPage';
import MidiPage from './pages/MidiPage';
import SetupLayout from './layout/SetupLayout';

const router = createBrowserRouter([
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
        ],
    },
    {
        path: '/setup',
        element: <SetupLayout />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
