'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider><Navbar />{children}<Footer /></SessionProvider>;
}
