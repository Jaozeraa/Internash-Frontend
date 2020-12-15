import React from 'react'
import { AuthProvider } from './auth'
import { ToastProvider } from './toast'
import { NotificationProvider } from './notification'
import { ConnectionProvider } from './connection'

const AppProvider: React.FC = ({ children }) => {
    return (
        <ToastProvider>
            <AuthProvider>
                <NotificationProvider>
                    <ConnectionProvider>
                        {children}
                    </ConnectionProvider>
                </NotificationProvider>
            </AuthProvider>
        </ToastProvider>
    )
}

export default AppProvider
