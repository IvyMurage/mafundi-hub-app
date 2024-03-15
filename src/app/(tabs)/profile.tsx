import { useAuth } from '@/contexts/AuthContext'
import ClientProfile from '../(modals)/client-profile'
import HandymanProfile from '../(modals)/handyman-profile'

const Profile = () => {
    const { userState } = useAuth()
    return (
        <>
            {userState?.user_role === 'client' && <ClientProfile />}
            {userState?.user_role === 'handyman' && <HandymanProfile />}
        </>

    )
}

export default Profile