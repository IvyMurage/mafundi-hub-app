import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react"

export const useServiceCategory = () => {
    const { authState } = useAuth()
    const [categoriesList, setCategories] = useState<{
        id: number | null;
        category_name: string | null;
        image_url: string | null
    }[]>
        ([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const getServicesCategory = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/service_categories`, {
                    headers: { Authorization: `Bearer ${authState?.token}` }
                })
                const data = await response.json()
                if (!response.ok) throw new Error(data.message)
                if (response.ok) {
                    setCategories(data.map((item: {
                        id: number | null;
                        category_name: string | null;
                        image_url: string | null
                    }) => {
                        return {
                            category_name: item.category_name,
                            service_category_id: item.id,
                            image_url: item.image_url
                        }
                    }))
                    setLoading(false)
                }
            }
            catch (err: any) {
                console.log(err.message)
                setLoading(false)
            }
        }
        getServicesCategory()
    }, [])
    return categoriesList
}