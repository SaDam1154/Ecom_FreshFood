import React, { useState, useEffect } from 'react';
import Header from './components/Header';
function DefaultLayout({ children }) {
    return (
        <div className='h-[100dvh] overflow-hidden'>
            <Header />
            <main className='w-full h-full overflow-x-hidden overflow-y-auto'>{children}</main>
        </div>
    );
}

export default DefaultLayout;
