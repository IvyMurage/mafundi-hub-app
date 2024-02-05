import { useMyJob } from "@/hooks/useMyJob";
import { useTaskPost } from "@/hooks/useTask";
import { JobPropType } from "@/types/job";
import { TaskFormProps } from "@/types/task";
import { FormikHelpers } from "formik";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface TaskProps {
    tasksState?: JobPropType[],
    isLoading?: boolean,
    error?: string,
    isError?: boolean,
    visible?: boolean,
    setVisible?: Dispatch<SetStateAction<boolean>>,
    handleSubmit?: (taskForm: TaskFormProps, resetForm: FormikHelpers<TaskFormProps>) => Promise<any>
}

const TaskContext = createContext<TaskProps>({})

export const useTask = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }
    return context
}

export const TaskProvider = ({ children }: any) => {
    const { handleSubmit, isLoading, error, isError, visible, setVisible, task } = useTaskPost()
    const { jobs } = useMyJob()
    const [tasksState, setTasksState] = useState<JobPropType[]>([])
    useEffect(() => {
        // Add a new task
        if (task) {
            setTasksState(prevTasks => [...prevTasks, task]);
        }
    }, [task]); // Dependency on task only for adding new tasks

    useEffect(() => {
        // Set jobs as tasks
        if (jobs) {
            setTasksState(jobs);
        }
    }, [jobs]); // Separate effect for jobs to reset tasks based on jobs

    console.log("haha", tasksState)
    const value = {
        tasksState,
        isLoading,
        error,
        isError,
        visible,
        setVisible,
        handleSubmit
    }
    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}