import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import PostDetails from './pages/post-details';
import AppLayout from './components/ui/app-layout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/postDetails/:id" element={<PostDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
