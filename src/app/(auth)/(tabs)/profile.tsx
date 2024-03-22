import { useAuth } from '@/contexts/AuthContext'
import ClientProfile from '@/app/(auth)/(modals)/client-profile'
import HandymanProfile from '@/app/(auth)/(modals)/handyman-profile'

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