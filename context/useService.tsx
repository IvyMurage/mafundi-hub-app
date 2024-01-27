import { useEffect, useState } from "react"
import { useAuth } from "./AuthContext";

export const useService = () => {
    // /services

    const { authState } = useAuth()
    const [services, setServices] = useState<{ service_name: string; }[]>([])

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/services`,)
                const data = await response.json()
                console.log(data)
                if (!response.ok) throw new Error(data.message)

                if (response.ok) {
                    setServices(data?.map((service: { service_name: string }) => {
                        return {
                            service_name: service.service_name
                        }
                    }))
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getServices()
    }, [])
    return services
}