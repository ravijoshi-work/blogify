"use client"

import {SessionProvider} from 'next-auth/react';

import { ReactNode } from 'react';
import { Session } from 'next-auth';

interface AuthProviderProps {
    children?: ReactNode;
    session?: Session | null;
}

const AuthProvider = ({children, session}: AuthProviderProps) => (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
)

export default AuthProvider;