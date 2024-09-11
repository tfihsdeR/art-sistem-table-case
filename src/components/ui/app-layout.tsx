import Header from './header';
import { Outlet } from 'react-router-dom';

function AppLayout() {
    return (
        <div className="d-flex">
            <Header />
            <main className="w-100 d-flex flex-column overflow-scroll" style={{ marginTop: '80px' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;
