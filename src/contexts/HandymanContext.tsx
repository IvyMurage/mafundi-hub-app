import { getItemAsync } from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { HandymanType } from "@/types/handyman";


interface HandymanProps {
    loading?: boolean
    handymen?: HandymanType[]

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
    const [handymen, setHandymen] = useState<HandymanType[]>([])

    useEffect(() => {
        const getHandymen = async () => {
            const service_id = await getItemAsync('service_id')
            setLoading(true)
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
                    setHandymen(data?.handymen?.map((item: {
                        id: number | null;
                        first_name: string | null;
                        last_name: string | null;
                        location: { city: string; county: string; country: string } | null;
                        user_rating: number | null;
                        avatar_url: string | null;
                    }) => {
                        return {
                            id: item.id,
                            first_name: item.first_name,
                            last_name: item.last_name,
                            location: `${item.location!.city}, ${item.location!.county}`,
                            user_rating: item.user_rating,
                            avatar_url: item.avatar_url
                        }
                    }))
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
        loading,
        handymen
    }
    return (
        <HandymanContext.Provider value={value}>
            {children}
        </HandymanContext.Provider>
    )
}

export default HandymanContext