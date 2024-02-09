import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

interface TaskPropType {
  id?: number;
  job_title: string;
  task_description: string;
  job_price: string | null;
  duration_label: string | null;
  service_name: string | null;
  task_responsibilities: string[] | null;
  available: boolean;
  task_location: string | null;
}
export const useTaskFetch = (taskId: string) => {
  const [task, setTask] = useState<TaskPropType>({
    job_title: "",
    task_description: "",
    job_price: "",
    duration_label: "",
    service_name: "",
    task_responsibilities: [],
    available: true,
    task_location: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useAuth();
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/tasks/${taskId}/show`,
          {
            headers: { Authorization: `Bearer ${authState?.token}` },
          }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        if (response.ok) {
          setTask({
            job_title: data.job_title,
            task_description: data.task_description,
            job_price: `Ksh.${data.job_price}`,
            duration_label: data.duration_label,
            service_name: data.service_name,
            task_responsibilities: data.task_responsibilities,
            available: data.available,
            task_location: `${data.location.city}, ${data.location.county} ${data.location.country}`,
          });
          setLoading(false);
        }
      } catch (err: any) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId, authState?.token]);
  return { task, loading };
};
