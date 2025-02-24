import { useEffect, useState } from "react"

export const useService = () => {
    // /services
    const [services, setServices] = useState<{ label: string; value: string; key: number }[]>([])

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/services`,)
                const data = await response.json()
                if (!response.ok) throw new Error(data.message)

                if (response.ok) {
                    setServices(data?.map((service: { service_name: string; id: number }) => {
                        return {
                            key: service?.id,
                            label: service?.service_name,
                            value: service?.id.toString()
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