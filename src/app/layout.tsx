'use client';

import React from 'react';
import { Provider } from 'react-redux';

import '@/app/globals.css';
import {store} from "@/store";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            {children}
        </Provider>
        </body>
        </html>
    );
}
