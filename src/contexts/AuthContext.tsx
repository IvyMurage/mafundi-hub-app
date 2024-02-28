import React, { createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

interface AuthProps {
    authState?: { token: string | null; authenicated: boolean | null }
    userState?: {
        id: number | null;
        email: string | null;
        user_role: string | null;
        user_id: number | null;
        avatar_url: string | null
    }
    setUserState?: React.Dispatch<React.SetStateAction<{
        id: number | null;
        email: string | null;
        user_role: string | null;
        user_id: number | null;
        avatar_url: string | null
    }>>
    isLoading?: boolean
    onRegister?: (user: { email: string | null; password: string | null; confirmation_password: string | null }) => Promise<any>;
    onLogin?: (user: { email: string | null; password: string | null }) => Promise<any>
    onRole?: (userRole: { role: string | null; user_id: number | null }) => Promise<any>;
    onLogout?: () => Promise<any>
    setErrors?: React.Dispatch<React.SetStateAction<string>>
    authError?: string
}
const AuthContext = createContext<AuthProps>({})
const TOKEN_KEY = '12345'


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
    const [user, setUser] = useState<{
        id: number | null;
        email: string | null;
        user_role: string | null;
        user_id: number | null,
        avatar_url: string | null
    }>({
        email: null,
        id: null,
        user_role: '',
        user_id: null,
        avatar_url: null
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [authError, setErrors] = useState<string>('')
    useEffect(() => {
        const loadToken = async () => {
            setLoading(true)
            try {
                const token = await SecureStore.getItemAsync(TOKEN_KEY)
                const user = await SecureStore.getItemAsync('user')
                if (user) {
                    setUser(JSON.parse(user))
                }
                if (token) {
                    setAuthState({ token, authenicated: true })
                }
                console.log(user)
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
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        console.log('the registeration', response)
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData?.status?.errors || "An unknown error occurred";
            throw new Error(errorMessage);
        }
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            const token = response.headers.get('authorization')?.split(' ')[1]
            setUser(data?.user)
            await SecureStore.setItemAsync(TOKEN_KEY, token!)
            await SecureStore.setItemAsync('user', JSON.stringify(data?.user))
            setAuthState({ token: token!, authenicated: true })
            setLoading(false)
        }
        return response
    }

    const login = async (user: { email: string | null; password: string | null }) => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: user })
            })


            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData || "An unknown error occurred";
                // Optionally, you can throw an error here or update the state to show an error message in the UI
                throw new Error(errorMessage);
            }
            if (response.ok) {
                const data = await response.json()
                const token = response.headers.get('authorization')?.split(' ')[1]
                setUser(data?.user)
                await SecureStore.setItemAsync(TOKEN_KEY, token!)
                await SecureStore.setItemAsync('user', JSON.stringify(data?.user))
                setAuthState({ token: token!, authenicated: true })
                setLoading(false)
                console.log(data)
            }

            return response
        }
        catch (error: any) {
            setErrors(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    const role = async (
        userRole: {
            role: string | null,
            user_id: number | null,
        }) => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user_role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userRole)
            })
            if (response.ok) {
                const data = await response.json()
                setUser(data?.user)
                await SecureStore.setItemAsync('user', JSON.stringify(user))
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
        setUserState: setUser,
        onLogin: login,
        onLogout: logout,
        userState: user,
        onRole: role,
        authState,
        isLoading: loading,
        authError,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}