import { useAuth } from "@/contexts/AuthContext"
import { ClientProfileProps } from "@/types/client"
import { request } from "@/utils/executePostRequest"
import { useRouter } from "expo-router"
import { setItemAsync } from "expo-secure-store"
import { FormikHelpers } from "formik"
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

export const useClientPost = () => {
    const { authState, userState } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (client: ClientProfileProps, resetForm: FormikHelpers<ClientProfileProps>) => {
        try {
            setIsLoading(true)
            const location = client.location_attributes?.split(', ')
            const payload = {
                ...client,
                location_attributes: {
                    city: location![0],
                    county: location![1],
                    country: location![2],
                },
                user_id: userState?.id
            }
            const result = await request('POST', JSON.stringify(payload), 'clients/create', authState?.token!)
            const { response, data } = result
            if (response.ok) {
                resetForm.resetForm()
                router.push('/(modals)/login')
                await setItemAsync('client_id', data.id)
            }
            setIsLoading(false)
        }
        catch (err: string | any) {
            console.log(err.message)
            setAlertVisible(true)
            setError(true)
            setErrorMessage(err.message)
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
        }
    }
    return {
        handleSubmit,
        isLoading,
        alertVisible,
        error,
        errorMessage,
        setAlertVisible
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
                    console.log(data)
                    throw new Error(data.message || response.statusText)
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
            catch (error: any) {
                console.log(error.message)
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