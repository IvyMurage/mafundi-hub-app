import { useAuth } from "@/context/AuthContext"
import { ClientProfileProps } from "@/types/client"
import { useEffect, useState } from "react"


export const useClient = () => {
    const [user, setUser] = useState<ClientProfileProps>({
        first_name: '',
        last_name: '',
        phone_number: '',
        location_attributes: ''
    })

    return {
        user,
        setUser
    }
}
export const useClientUpdate = () => {
    const { userState, authState } = useAuth()
    const { user, setUser } = useClient()

    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<string>(require('@/assets/images/placeholder.jpg'))
    const [visible, setVisible] = useState<boolean>(false)

    const handleSubmit = (values: ClientProfileProps) => {
        try {
            setLoading(true)
            const location = values.location_attributes?.split(', ')
            const payload = {
                ...values,
                location_attributes: {
                    city: location![0],
                    county: location![1],
                    country: location![2],
                },
                user_id: userState?.id
            }
            const updateUser = async (userId: number) => {
                setLoading(true)
                try {
                    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/${userId}/update`, {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${authState?.token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    })
                    const data = await response.json()
                    if (!response.ok) {
                        throw new Error(data.error)
                    }
                    if (response.ok) {
                        setVisible(true)
                        setLoading(false)
                    }
                }
                catch (error) {
                    console.log(error)
                }
                finally {
                    setLoading(false)
                }
            }
            updateUser(userState?.user_id!)
        }
        catch (error) {
            console.log(error)
        }

    }

    const handleImage = (image: string) => {
        setImage(image)
    }

    return {
        loading,
        image,
        visible,
        user,
        handleSubmit,
        handleImage,
        setVisible,
        setUser
    }
}

export const useClientFetcher = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const { userState, authState } = useAuth()
    const { user, setUser } = useClient()

    useEffect(() => {
        const fetchUser = async (userId: number) => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/${userId}/show`, {
                    headers: {
                        'Authorization': `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.error)
                }

                if (response.ok) {
                    setUser({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        phone_number: data.phone_number,
                        location_attributes: `${data.location.city}, ${data.location.county}, ${data.location.country}`
                    })
                    setLoading(false)
                }
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }

        }
        fetchUser(userState?.user_id!)
    }, [])

    return {
        isLoading,
        user
    }
}