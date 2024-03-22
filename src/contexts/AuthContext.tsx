import React, { createContext, useState, useEffect, useCallback } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useRouter, useSegments } from 'expo-router';
import { decode } from 'base-64'; // Import the base64 decode function


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
        user_role: null,
        user_id: null,
        avatar_url: null
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [authError, setErrors] = useState<string>('')

    const router = useRouter()
    const segments = useSegments()



    const useProtectedRoute = (user: {
        id: number | null;
        email: string | null;
        user_role: string | null;
        user_id: number | null,
        avatar_url: string | null
    }, authState: {
        authenicated: boolean | null
        token: string | null
    }) => {

        const hasTokenExpired = async (): Promise<boolean> => {
            let token = (await SecureStore.getItemAsync('token')) as string;

            if (!token) {
                return false; // Token is missing, not expired
            }

            const trimmedToken = token.trim();

            // Regular expression to validate base64 format
            const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
            const isValid = base64Regex.test(trimmedToken);

            console.log('Token validity:', isValid);

            if (isValid) {
                try {
                    const decodedToken: any = decode(trimmedToken); // Decode the trimmed token
                    console.log('Decoded token:', decodedToken);

                    const expiryDate = new Date(decodedToken.exp * 1000);
                    console.log('Expiry date:', expiryDate);

                    const currentDate = new Date();

                    if (currentDate > expiryDate) {
                        return true; // Token has expired
                    }
                } catch (error) {
                    console.log('Error decoding token:', error);
                    return false; // Error decoding token
                }
            }
            return false; // Token is not expired or invalid format
        };


        useEffect(() => {
            const loadToken = async () => {
                setLoading(true)
                try {
                    // check if token has expired and delete it
                    if (await hasTokenExpired()) {
                        await SecureStore.deleteItemAsync('token')
                        setAuthState({ token: null, authenicated: false })
                    }
                    else {
                        const token = await SecureStore.getItemAsync('token')
                        const user = await SecureStore.getItemAsync('user')
                        if (user) {
                            setUser(JSON.parse(user))
                        }
                        if (token) {
                            setAuthState({ token, authenicated: true })
                        }
                    }
                }
                catch (error) {
                    if (error instanceof Error) console.log('error', error.message)
                }
                finally {
                    setLoading(false)
                }
            }
            loadToken()
        }, [])


        useEffect(() => {
            const inAuthGroup = segments[0] === "(auth)"
    
            if (authState?.authenicated === null && inAuthGroup) {
                router.replace('/(public)/login')
            }
            else if (authState?.authenicated === true && !inAuthGroup) {
                router.replace('/(auth)')
            }
            else if (user.id === null && authState?.authenicated === null && inAuthGroup) {
                router.replace('/(public)/get-started')
            }

        }, [authState, user, segments]);

    }

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
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData?.status?.errors || "An unknown error occurred";
            throw new Error(errorMessage);
        }
        if (response.ok) {
            const data = await response.json()
            const token = response.headers.get('authorization')?.split(' ')[1]
            setUser(data?.user)
            await SecureStore.setItemAsync('token', token!)
            await SecureStore.setItemAsync('user', JSON.stringify(data?.user))
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
            if (response.status === 401) {
                const errorData = await response.json();
                const errorMessage = errorData?.error || "An unknown error occurred";
                // Optionally, you can throw an error here or update the state to show an error message in the UI
                throw new Error(errorMessage);
            }
            if (response.status === 200) {
                const data = await response.json()
                const token = response.headers.get('authorization')?.split(' ')[1]
                setUser(data?.user)
                await SecureStore.setItemAsync('token', token!)
                await SecureStore.setItemAsync('user', JSON.stringify(data?.user))
                setAuthState({ token: token!, authenicated: true })
                setLoading(false)
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
            console.log('hello', error)
        }
        finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('token')
        setAuthState({ token: null, authenicated: null })
        const inAuthGroup = segments[0] === ('auth')
        inAuthGroup && authState.authenicated === null && router.replace('/(public)/login')
    }
    useProtectedRoute(user, authState)


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