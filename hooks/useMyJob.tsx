import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react"

export const useMyJob = () => {
    const { authState, userState } = useAuth()
    const [jobs, setJobs] = useState<{
        id: number | null;
        job_title: string | null;
        job_location: string | null;
        job_date: string | null;
        job_price: string | null;
        job_category: string | null;
        duration_label: string | null;
    }[]>([])

    useEffect(() => {
        const getMyJobs = async () => {
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/tasks?client=${userState?.user_id}`, {
                    headers: { Authorization: `Bearer ${authState?.token}` }
                })
                const data = await response.json()
                if (!response.ok) {
                    let error
                    if (data.message) {
                        error = data.message
                    }
                    else if (data.error) {
                        error = data.error
                    }
                    else {
                        error = 'An error occurred'
                    }
                    throw new Error(error)
                }
                console.log(data)
                if (response.ok) {
                    setJobs(data?.task?.map((item: {
                        id: number | null;
                        job_title: string | null;
                        location: { city: string; county: string; country: string } | null;
                        created_at: string | null;
                        job_price: number | null;
                        service_name: string | null;
                        duration_label: string | null;
                    }) => {
                        return {
                            id: item.id,
                            job_title: item.job_title,
                            job_location: `${item.location!.city}, ${item.location!.county}, ${item.location!.country}`,
                            job_date: item.created_at,
                            job_price: `ksh.${item.job_price}`,
                            job_category: item.service_name,
                            duration_label: item.duration_label
                        }
                    }))
                }
            }
            catch (err: any) {
                console.log(err.message)
            }
        }
        getMyJobs()
    }, [])
    return jobs
}