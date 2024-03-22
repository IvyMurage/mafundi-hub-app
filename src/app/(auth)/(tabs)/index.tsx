import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ClientHome from '@/app/(auth)/(screens)/client-home'
import HandymanJobs from '@/app/(auth)/(screens)/handyman-jobs'
import { TaskProvider } from '@/contexts/TaskContext'
import { LocationProvider } from '@/contexts/LocationContext'

export default function Home ()  {
  const { userState } = useAuth()

  return (
    <>

      {userState?.user_role === 'client' && (<>
        <ClientHome />
      </>
      )
      }{
        userState?.user_role === 'handyman' && (
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
