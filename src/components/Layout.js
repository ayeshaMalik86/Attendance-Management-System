// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <main style={{ padding: '20px' }}>
                {children}
            </main>
        </div>
    );
}

export default Layout;
