import { createContext, useContext } from "react";

interface HandymanProps {

}
interface HandymanProviderProps {
    children: React.ReactNode
}
const HandymanContext = createContext<HandymanProps>({})

export const useHandyman = () => {
    const context = useContext(HandymanContext)
    if (!context) {
        throw new Error('useHandyman must be used within a HandymanProvider')
    }
    return context
}

export const HandymanProvider = ({ children }: HandymanProviderProps) => {
    return (
        <HandymanContext.Provider value={{}}>
            {children}
        </HandymanContext.Provider>
    )
}

export default HandymanContext