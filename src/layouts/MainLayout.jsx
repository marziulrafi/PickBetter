import React, { Suspense } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen gap-10'>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
            <Footer />
        </div>
    );
};

export default MainLayout;