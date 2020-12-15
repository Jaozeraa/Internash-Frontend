import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'
import jwt_decode from 'jwt-decode'
import { getUnixTime } from 'date-fns'

interface User {
    id: string
    avatar_url: string
    name: string
    email: string
    skill: string
    cpf: string
}

interface SignInCredentials {
    email: string
    password: string
}

interface AuthContextData {
    user: User
    logOut(): void
    verifyToken(): void
    logIn(credentials: SignInCredentials): Promise<void>
    updateUser(user: User): void
    deleteUser(): Promise<void>;
}

interface AuthState {
    token: string
    user: User
}

interface TokenDecoded {
    exp: number;
    iat: number;
    sub: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Internash:token')
        const user = localStorage.getItem('@Internash:user')


        if (token && user) {
                api.defaults.headers.authorization = `Bearer ${token}`


                return {token, user: JSON.parse(user)}
        }

        return {} as AuthState
    })

    const updateUser = useCallback((user: User) => {
        localStorage.setItem('@Internash:user', JSON.stringify(user))

        setData({
            token: data.token,
            user,
        })
    }, [setData, data.token])

    const logIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        })
        const { token, user } = response.data

        localStorage.setItem('@Internash:token', token)
        localStorage.setItem('@Internash:user', JSON.stringify(user))

        api.defaults.headers.authorization = `Bearer ${token}`

        setData({ token, user })
    }, [])

    const verifyToken = useCallback(() => {
        const token = localStorage.getItem('@Internash:token')

        if (token) {
            const decoded: TokenDecoded = jwt_decode(token);
            if (getUnixTime(Date.now()) > decoded.exp) {
                throw new Error('This token is invalid.')
            }
        }
    }, [])

    const logOut = useCallback(() => {
        localStorage.removeItem('@Internash:token')
        localStorage.removeItem('@Internash:user')

        setData({} as AuthState)
    }, [])

    const deleteUser = useCallback(async () => {
        await api.delete('/users');
        logOut();
        document.location.reload()
    }, [logOut]);


    return (
        <AuthContext.Provider value={{user: data.user, verifyToken, logIn, logOut, updateUser, deleteUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
