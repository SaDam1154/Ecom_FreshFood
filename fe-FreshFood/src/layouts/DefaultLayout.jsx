import React, { useState, useEffect } from 'react';
import Header from './components/Header';
function DefaultLayout({ children }) {
    return (
        <div className='h-full overflow-hidden'>
            <Header />
            <div className='w-full h-auto overflow-x-hidden overflow-y-auto'>{children}</div>
        </div>
    );
}

export default DefaultLayout;
