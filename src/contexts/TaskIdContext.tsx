import { createContext, useContext, useState } from "react";

type TaskContextIdType = {
    taskId: string | null,
    proposalId: string | null,
    setTaskId: React.Dispatch<React.SetStateAction<string | null>>
    setProposalId: React.Dispatch<React.SetStateAction<string | null>>
}

const TaskContextId = createContext<TaskContextIdType>({ taskId: null, setTaskId: () => { }, proposalId: null, setProposalId: () => { } });

export const useTaskId = () => {
    const context = useContext(TaskContextId)
    if (!context) {
        throw new Error('useTaskId must be used within a TaskIdProvider')
    }
    return context
}

export const TaskIdProvider = ({ children }: { children: React.ReactNode }) => {
    const [taskId, setTaskId] = useState<string | null>(null)
    const [proposalId, setProposalId] = useState<string | null>(null)
    const value = { taskId, setTaskId, proposalId, setProposalId }
    // console.log("TaskIdProvider", taskId)
    return (
        <TaskContextId.Provider value={value}>
            {children}
        </TaskContextId.Provider>
    )
};


export default TaskContextId;
