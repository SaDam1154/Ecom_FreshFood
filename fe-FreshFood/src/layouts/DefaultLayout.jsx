import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className='h-40'></div>
            <div className='px-28  relative'>
                <Sidebar />
            </div>
            <main>{children}</main>
        </div>
    );
}

export default DefaultLayout;
