import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ClientHome from '../(screens)/client-home'
import HandymanJobs from '../(screens)/handyman-jobs'
import { TaskProvider } from '@/contexts/TaskContext'
import { LocationProvider } from '@/contexts/LocationContext'
import { useRouter } from 'expo-router'

const Page = () => {
  const { userState, authState } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!authState?.token) {
      router.push('/login')
    }
  }, [authState?.token])
  return (
    <>
      {userState?.user_role === 'client' ? (<>
        <ClientHome />
      </>
      ) : (
        <>
          <TaskProvider>
            <LocationProvider>
              <HandymanJobs />
            </LocationProvider>
          </TaskProvider>
        </>
      )}
    </>
  )
}

export default Page
