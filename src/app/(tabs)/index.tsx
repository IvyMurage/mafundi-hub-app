import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ClientHome from '../(screens)/client-home'
import HandymanJobs from '../(screens)/handyman-jobs'
import { TaskProvider } from '@/contexts/TaskContext'
import { LocationProvider } from '@/contexts/LocationContext'

const Page = () => {
  const { userState } = useAuth()
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
