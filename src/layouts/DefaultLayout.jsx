import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MyFooter from '../components/MyFooter';

function DefaultLayout({ children }) {
    return (
        <div className="flex h-full flex-col overflow-hidden">
            <div>
                <Header />
            </div>
            <div className="min-h-auto flex h-full w-full grow flex-col justify-between gap-3 overflow-y-auto overflow-x-hidden">
                <div className="">{children}</div>
                <MyFooter />
            </div>
        </div>
    );
}

export default DefaultLayout;
