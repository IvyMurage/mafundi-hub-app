import { useAuth } from "@/context/AuthContext"
import { TaskFormProps } from "@/types/task"
import { request } from "@/utils/executePostRequest"
import { useState } from "react"

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
export const useTaskPost = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const { authState, userState } = useAuth();
    const handleSubmit = async (taskForm: TaskFormProps) => {
        try {
            setLoading(true)
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
            const { response, data } = await request('POST', JSON.stringify(payload), 'tasks/create', authState?.token!)
            if (response.ok) {
                console.log(data)
                setVisible(true)
            }
        }
        catch (error: any) {
            setIsError(true)
            setError(error.message)
            setVisible(true)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { isLoading, error, handleSubmit, visible, setVisible, isError }
}