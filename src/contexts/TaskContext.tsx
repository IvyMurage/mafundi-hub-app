import { JobPropType } from "@/types/job";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { request } from "@/utils/executePostRequest";
import { TaskFormProps } from "@/types/task";
import { FormikHelpers } from "formik";
import * as SecureStore from 'expo-secure-store'
import { useRouter } from "expo-router";

interface TaskProps {
    tasks?: JobPropType[],
    setTasks?: Dispatch<SetStateAction<JobPropType[]>>,
    loading?: boolean,
    isLoading?: boolean,
    isError?: boolean,
    error?: string,
    visible?: boolean,
    setVisible?: Dispatch<SetStateAction<boolean>>,
    setPageNumber?: Dispatch<SetStateAction<number>>
    handleSubmit?: (taskForm: TaskFormProps, resetForm: FormikHelpers<TaskFormProps>) => Promise<void>
    handleRoute?: () => Promise<string | null>
}

interface TaskProviderProps {
    children: React.ReactNode
}
const TaskContext = createContext<TaskProps>({})

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
    const url = userState?.user_role === 'client' ? `${process.env.EXPO_PUBLIC_API_URL}/tasks?client=${userState?.user_id}&page=${pageNumber}&per_page=10` :
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

        setTasks(prevTasks => [task, ...prevTasks])
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

    const handleRoute = async () => {
        const instant_book = await SecureStore.getItemAsync('instant_book')
        return instant_book
    }

    useEffect(() => {
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
                        router.push('/login')
                        error = data.error;
                    } else {
                        error = response.statusText;
                    }
                    throw new Error(error);
                }
                console.log("Data", data)
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
                }
            }
            catch (err: any) {
                if (err.message === "Invalid token") {
                    router.push('/login')
                }
                console.log("thisss", err.message)
            }
            finally {
                setLoading(false)
            }
        }
        getMyJobs()
    }, [pageNumber])

    const value = {
        tasks,
        setTasks,
        loading,
        setPageNumber,
        isLoading,
        isError,
        error,
        visible,
        setVisible,
        handleSubmit,
        handleRoute
    }
    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}