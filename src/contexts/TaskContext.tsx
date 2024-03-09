import { JobPropType } from "@/types/job";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { request } from "@/utils/executePostRequest";
import { TaskFormProps } from "@/types/task";
import { FormikHelpers } from "formik";
import * as SecureStore from 'expo-secure-store'
import { useRouter } from "expo-router";
import { MapPropType } from "./LocationContext";

interface TaskProps {
    tasks?: JobPropType[],
    pageNumber?: number,
    locations?: MapPropType[],
    service_id?: string,
    available?: boolean,
    location?: string,
    setTasks?: Dispatch<SetStateAction<JobPropType[]>>,
    loading?: boolean,
    isLoading?: boolean,
    isError?: boolean,
    error?: string,
    visible?: boolean,
    setVisible?: Dispatch<SetStateAction<boolean>>,
    setLocation?: Dispatch<SetStateAction<string>>,
    setServiceId?: Dispatch<SetStateAction<string>>,
    setPageNumber?: Dispatch<SetStateAction<number>>
    setAvailable?: Dispatch<SetStateAction<boolean>>,
    setLocations?: Dispatch<SetStateAction<MapPropType[]>>,
    handleSubmit?: (taskForm: TaskFormProps, resetForm: FormikHelpers<TaskFormProps>) => Promise<void>
    handleRoute?: () => Promise<string | null>
    getMyJobs: () => Promise<void>
}

interface TaskProviderProps {
    children: React.ReactNode
}
const TaskContext = createContext<TaskProps>({
    tasks: [],
    locations: [],
    pageNumber: 1,
    location: '',
    available: false,
    setTasks: () => { },
    loading: false,
    isLoading: false,
    isError: false,
    error: '',
    visible: false,
    setVisible: () => { },
    handleSubmit: async () => { },
    getMyJobs: async () => { },
    service_id: '',
    setServiceId: () => { },
    setAvailable: () => { },
    setLocation: () => { },
    setLocations: () => { },
    setPageNumber: () => { }
})

export const useTask = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }
    return context
}

export const useTaskProps = () => {
    const [taskForm, setTaskForm] = useState<TaskFormProps>({
        job_title: '',
        service_id: '',
        job_price: '',
        duration_label: '',
        instant_booking: '',
        location_attributes: '',
        task_description: '',
        task_responsibilities: '',
    })
    return { taskForm, setTaskForm }
}
export const TaskProvider = ({ children }: TaskProviderProps) => {
    const router = useRouter()
    const { authState, userState } = useAuth()
    const [tasks, setTasks] = useState<JobPropType[]>([])
    const [locations, setLocations] = useState<MapPropType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [task, setTask] = useState<JobPropType>({
        id: null,
        job_title: '',
        job_location: '',
        job_date: '',
        job_price: '',
        job_category: '',
        duration_label: '',
        available: false
    })
    const [service_id, setServiceId] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [available, setAvailable] = useState<boolean>(false)
    const url =
        userState?.user_role === 'client' ?
            `${process.env.EXPO_PUBLIC_API_URL}/tasks?client_id=${userState?.user_id}&page=${pageNumber}&per_page=10` :
            service_id.length > 0 ?
                `${process.env.EXPO_PUBLIC_API_URL}/tasks?service_id=${service_id}&page=${pageNumber}&per_page=10` :
                available ?
                    `${process.env.EXPO_PUBLIC_API_URL}/tasks?service_id=${service_id}&available=${available}&page=${pageNumber}&per_page=10` :
                    location.length > 0 ?
                        `${process.env.EXPO_PUBLIC_API_URL}/tasks?city=${location}&page=${pageNumber}&per_page=10` :
                        `${process.env.EXPO_PUBLIC_API_URL}/tasks?page=${pageNumber}&per_page=10`



    const handleSubmit = async (taskForm: TaskFormProps, resetForm: FormikHelpers<TaskFormProps>) => {
        const optimisticTaskId = Math.floor(Math.random() * 1000000)
        setTask({
            id: optimisticTaskId,
            job_title: taskForm.job_title,
            job_location: taskForm.location_attributes,
            job_date: new Date().toISOString(),
            job_price: `ksh.${taskForm.job_price}`,
            job_category: taskForm.service_id,
            duration_label: taskForm.duration_label,
            available: true
        })

        try {
            setIsLoading(true)
            const location = taskForm.location_attributes?.split(', ')
            const payload = {
                ...taskForm,
                service_id: parseInt(taskForm.service_id!),
                location_attributes: {
                    city: location![0],
                    county: location![1],
                    country: location![2],
                },
                job_price: parseInt(taskForm.job_price!),
                instant_booking: taskForm.instant_booking === 'true' ? true : false,
                task_responsibilities: taskForm.task_responsibilities?.trim().split(', '),
                client_id: userState?.user_id
            }

            await SecureStore.setItemAsync('service_id', taskForm.service_id!)
            await SecureStore.setItemAsync('instant_book', taskForm.instant_booking!)

            const { response, data } = await request('POST', JSON.stringify(payload), 'tasks/create', authState?.token!)
            if (response.ok) {
                setTasks(prevTasks => [{
                    id: data.id,
                    job_title: data.job_title,
                    job_location: `${data.location.city}, ${data.location.county}, ${data.location.country}`,
                    job_date: data.created_at,
                    job_price: `ksh.${data.job_price}`,
                    job_category: data.service_name,
                    duration_label: data.duration_label,
                    available: data.available
                }, ...prevTasks,])
                resetForm.resetForm()
                setVisible(true)
            }
        }
        catch (error: any) {
            setIsError(true)
            setError(error.message)
            setVisible(true)
        }
        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        if (task.id !== null) {
            setTasks(prevTasks => [task, ...prevTasks]); // Add the new task to tasks
        }
    }, [task]); // Dependency array includes task
    const handleRoute = async () => {
        const instant_book = await SecureStore.getItemAsync('instant_book')
        return instant_book
    }


    const getMyJobs = async () => {
        try {
            setLoading(true)
            const response = await fetch(url, {
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
                setTasks(data?.task?.map((item: {
                    id: number | null;
                    job_title: string | null;
                    location: { city: string; county: string; country: string } | null;
                    created_at: string | null;
                    job_price: number | null;
                    service_name: string | null;
                    duration_label: string | null;
                    available: boolean | null;
                }) => {
                    return {
                        id: item.id,
                        job_title: item.job_title,
                        job_location: `${item.location!.city}, ${item.location!.county}, ${item.location!.country}`,
                        job_date: item.created_at,
                        job_price: `ksh.${item.job_price}`,
                        job_category: item.service_name,
                        duration_label: item.duration_label,
                        available: item.available
                    }
                }))

                setLocations(data?.task?.map((item: { location: { city?: string; county?: string; country?: string, latitude?: number, longitude?: number } }) => {
                    return {
                        city: item.location.city!,
                        county: item.location.county!,
                        country: item.location.country!,
                        latitude: item.location.latitude!,
                        longitude: item.location.longitude!
                    }
                }))
                setLoading(false)
            }
        }
        catch (err: any) {
            console.log("thisss", err.message)
        }
        finally {
            setLoading(false)
        }
    }


    const value = {
        tasks,
        locations,
        pageNumber,
        location,
        available,
        setTasks,
        loading,
        setPageNumber,
        isLoading,
        isError,
        error,
        visible,
        setVisible,
        handleSubmit,
        getMyJobs,
        handleRoute,
        service_id,
        setServiceId,
        setAvailable,
        setLocation,
        setLocations
    }
    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}