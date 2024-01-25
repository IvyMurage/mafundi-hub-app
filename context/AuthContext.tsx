import React, { createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

interface AuthProps {
    authState?: { token: string | null; authenicated: boolean | null }
    userState?: { id: number | null; email: string | null }
    isLoading?: boolean
    onRegister?: (user: { email: string | null; password: string | null; confirmation_password: string | null }) => Promise<any>;
    onLogin?: (user: { email: string | null; password: string | null }) => Promise<any>
    onLogout?: () => Promise<any>
}
const AuthContext = createContext<AuthProps>({})
const TOKEN_KEY = '12345'
const API_URL = 'https://mafundi-hub-api.onrender.com'


export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context

}
export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<
        { token: string | null; authenicated: boolean | null }>
        ({
            token: null,
            authenicated: null
        })
    const [user, setUser] = useState<{ id: number | null; email: string | null }>({
        email: null,
        id: null
    })

    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const loadToken = async () => {
            setLoading(true)
            try {
                const token = await SecureStore.getItemAsync(TOKEN_KEY)
                if (token) {
                    setAuthState({ token, authenicated: true })
                }
            }
            catch {
                console.log('error')
            }
            finally {
                setLoading(false)
            }
        }

        loadToken()
    }, [])

    const register = async (
        user: {
            email: string | null;
            password: string | null;
            confirmation_password: string | null
        }
    ) => {
        try {

            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                const data = await response.json()
                const token = response.headers.get('authorization')?.split(' ')[1]
                setUser(data?.user)
                await SecureStore.setItemAsync(TOKEN_KEY, token!)
                setAuthState({ token: token!, authenicated: true })
                setLoading(false)
            }
            return response

        }
        catch (error) {
            console.log(error)
        }

    }

    const login = async (user: { email: string | null; password: string | null }) => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: user })
            })


            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.errors || "An unknown error occurred";
                console.error("API Error:", errorMessage);
                // Optionally, you can throw an error here or update the state to show an error message in the UI
                throw new Error(errorMessage);
            }
            if (response.ok) {
                const data = await response.json()
                const token = response.headers.get('authorization')?.split(' ')[1]
                setUser(data?.user)
                await SecureStore.setItemAsync(TOKEN_KEY, token!)
                setAuthState({ token: token!, authenicated: true })
                setLoading(false)
            }

            return response
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        setAuthState({ token: null, authenicated: false })
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        userState: user,
        authState,
        isLoading: loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}