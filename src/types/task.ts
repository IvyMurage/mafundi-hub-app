export type TaskFormProps = {
    job_title: string;
    service_id: string;
    job_price: string;
    duration_label: string;
    instant_booking: string;
    location_attributes: string;
    task_description: string;
    task_responsibilities: string;
    job_status:string
};

export type TaskType = {
    id: number;
    available: boolean;
    duration_label: string | null;
    job_price: string | null;
    job_status:string;
    job_title: string;
    location: { city: string; country: string; county: string; latitude: number; longitude: number };
    service_name: string | null;
    task_description: string;
    task_responsibilities: string[];
};
