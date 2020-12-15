import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import api from '../services/api'

interface User {
    id: string;
    email: string;
    name: string;
    skill: string;
    avatar_url: string;
  }

interface Connection {
    id: string
    user: User
}

interface ConnectionContextData {
    connections: Connection[]
    addConnection(connected_user_email: string): Promise<void>
}

const ConnectionContext = createContext<ConnectionContextData>({} as ConnectionContextData)

export const ConnectionProvider: React.FC = ({ children }) => {
    const [connections, setConnections] = useState<Connection[]>([])

    useEffect(() => {
        async function getData() {
            const response = await api.get('connections')
            setConnections(response.data)
        }

        getData()
    }, [])

    const addConnection = useCallback(async (connected_user_email: string) => {
        await api.post(`connections/${connected_user_email}`)
        const response = await api.get('connections')
        setConnections(response.data)
    }, [])

    return (
        <ConnectionContext.Provider value={{addConnection, connections}}>
            {children}
        </ConnectionContext.Provider>
    )
}

export function useConnection(): ConnectionContextData {
    const context = useContext(ConnectionContext)

    if (!context) {
        throw new Error('useConnection must be used within an ConnectionProvider')
    }

    return context
}
