import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MyFooter from '../components/MyFooter';

function DefaultLayout({ children }) {
    return (
        <div className='h-full flex flex-col overflow-hidden'>
            <div>
                <Header />
            </div>
            <div className='grow flex flex-col gap-3 justify-between w-full h-full min-h-auto overflow-x-hidden overflow-y-auto'>
                <div className=''>{children}</div>
                <MyFooter />
            </div>
        </div>
    );
}

export default DefaultLayout;
