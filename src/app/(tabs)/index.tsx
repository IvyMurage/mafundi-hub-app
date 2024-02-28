import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ClientHome from '../(screens)/client-home'
import HandymanJobs from '../(screens)/handyman-jobs'

const Page = () => {
  const { userState } = useAuth()
  return (
    <>
      {userState?.user_role === 'client' ? (<>
        <ClientHome />
      </>
      ) : (
        <>
          <HandymanJobs />
        </>
      )}
    </>
  )
}

export default Page
