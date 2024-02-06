import { getItemAsync } from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface HandymanProps {
    loading?: boolean

}
interface HandymanProviderProps {
    children: React.ReactNode
}
const HandymanContext = createContext<HandymanProps>({})

export const useHandyman = () => {
    const context = useContext(HandymanContext)
    if (!context) {
        throw new Error('useHandyman must be used within a HandymanProvider')
    }
    return context
}

export const HandymanProvider = ({ children }: HandymanProviderProps) => {
    const { authState } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const getHandymen = async () => {
            const service_id = await getItemAsync('service_id')

            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handymen?service_id=${service_id}`, {
                    headers: { Authorization: `Bearer ${authState?.token}` }
                })
                const data = await response.json()
                if (!response.ok) {
                    let error;
                    if (data.message) {
                        error = data.message;
                    } else if (data.error) {
                        error = data.error;
                    } else {
                        error = response.statusText;
                    }
                    throw new Error(error);
                }

                if (response.ok) {
                    console.log(data)
                    setLoading(false)
                }
            }
            catch (err: any) {
                console.log(err.message)
                setLoading(false)
            }
            finally {
                setLoading(false)
            }

        }
        getHandymen()
    }, [])

    const value = {
        loading
    }
    return (
        <HandymanContext.Provider value={value}>
            {children}
        </HandymanContext.Provider>
    )
}

export default HandymanContext