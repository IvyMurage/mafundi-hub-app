import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { HandymanProps } from "@/src/types/handyman"
import { FormikHelpers } from "formik"
import { request } from "@/utils/executePostRequest"
import { setItemAsync } from "expo-secure-store"
export const useHandymanUpdate = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [alertVisible, setAlertVisible] = useState<boolean>(false)
    const [image, setImage] = useState<string>(require('@/assets/images/placeholder.jpg'))
    const { authState, userState } = useAuth();
    const handleSubmit = async (handyman: HandymanProps) => {
        try {
            setIsLoading(true)
            const location = handyman.location_attributes?.split(', ')
            const payload = {
                ...handyman,
                service_id: parseInt(handyman.service!),
                location_attributes: {
                    city: location![0],
                    county: location![1],
                    country: location![2],
                },
                year_of_experience: parseInt(handyman.year_of_experience!),
                handyman_skills: handyman.handyman_skills?.trim().split(', '),
                user_id: userState?.id
            }
            delete payload.service
            // console.log(payload)
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handymen/${userState?.user_id}/update`, {
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
                setIsLoading(false)
                setAlertVisible(true)
                // console.log(data)
            }
        }
        catch (err) {
            console.log(err)
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
        image,
        setAlertVisible
    }
}

export const useHandyman = () => {
    const [handyman, setHandyman] = useState<HandymanProps>({
        first_name: '',
        last_name: '',
        title: '',
        service: '',
        phone_number: '',
        year_of_experience: '',
        location_attributes: '',
        description: '',
        handyman_skills: ''
    })
    return {
        handyman,
        setHandyman
    }
}

export const useHandymanFetcher = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { authState, userState } = useAuth();
    const { handyman, setHandyman } = useHandyman()
    const [error, setError] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        const fetchUser = async (userId: number) => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handymen/${userId}/show`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.error)
                }
                console.log(response)
                if (response.ok) {
                    setHandyman({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        title: data.title,
                        service: data.service_name,
                        phone_number: data.phone_number,
                        year_of_experience: data.year_of_experience,
                        location_attributes: `${data.location?.city}, ${data.location?.county}, ${data.location?.country}`,
                        description: data.description,
                        handyman_skills: data.handyman_skills?.join(', ')
                    })
                    console.log(data)
                    setLoading(false)
                }
            }
            catch (error: any) {
                console.log("this", error)
                setError(error.message)
                setVisible(true)
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        fetchUser(userState?.user_id!)
    }, [])
    return {
        loading,
        error,
        handyman,
        visible,
        setVisible
    }
}

export const useHandymanPost = () => {
    const { authState, userState } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [alertVisible, setAlertVisible] = useState<boolean>(false)
    const handleSubmit = async (
        handyman: HandymanProps,
        resetForm: FormikHelpers<HandymanProps>) => {
        try {
            setIsLoading(true)
            const location = handyman.location_attributes?.split(', ')
            const payload = {
                ...handyman,
                service_id: parseInt(handyman.service!),
                location_attributes: {
                    city: location![0],
                    county: location![1],
                    country: location![2],
                },
                year_of_experience: parseInt(handyman.year_of_experience!),
                handyman_skills: handyman.handyman_skills?.trim().split(', '),
                user_id: userState?.id
            }

            const { response, data } = await request('POST', JSON.stringify(payload), 'handymen/create', authState?.token!)
            if (response) {
                await setItemAsync('handyman_id', data?.handyman?.id.toString())
                setAlertVisible(true)
                resetForm.resetForm()
            }
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
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
        setAlertVisible
    }
}