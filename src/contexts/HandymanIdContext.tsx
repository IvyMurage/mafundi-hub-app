import { createContext, useContext, useState } from "react";

type HandymanIdTYpe = {
    handymanId: string | null,
    setHandymanId: React.Dispatch<React.SetStateAction<string | null>>
}

const HandymanContextId = createContext<HandymanIdTYpe>({ handymanId: null, setHandymanId: () => { } });

export const useHandymanId = () => {
    const context = useContext(HandymanContextId)
    if (!context) {
        throw new Error('useTaskId must be used within a TaskIdProvider')
    }
    return context
}

export const HandymanContextIdProvider = ({ children }: { children: React.ReactNode }) => {
    const [handymanId, setHandymanId] = useState<string | null>(null)
    const value = { handymanId, setHandymanId }
    console.log("handyman", handymanId)
    return (
        <HandymanContextId.Provider value={value}>
            {children}
        </HandymanContextId.Provider>
    )
};


export default HandymanContextId;
