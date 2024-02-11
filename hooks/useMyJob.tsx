import { useAuth } from "@/context/AuthContext";
import { JobPropType } from "@/types/job";
import { useEffect, useState } from "react"

export const useMyJob = () => {
    const { authState, userState } = useAuth()
    const [jobs, setJobs] = useState<JobPropType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [pageNumber, setPageNumber] = useState<number>(1)

    useEffect(() => {
        const getMyJobs = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/tasks?client=${userState?.user_id}&page=${pageNumber}&per_page=10`, {
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
                    setLoading(false)
                }
            }
            catch (err: any) {
                console.log("This",err.message)
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        getMyJobs()
    }, [pageNumber])
    return { jobs, loading, pageNumber, setPageNumber }
}