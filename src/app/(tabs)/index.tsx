import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ClientHome from '../(screens)/client-home'
import HandymanJobs from '../(screens)/handyman-jobs'
import { TaskProvider } from '@/contexts/TaskContext'
import { LocationProvider } from '@/contexts/LocationContext'
import Colors from '@/constants/Colors'
import { StyleSheet } from 'react-native'

const Page = () => {
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

const headerStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.primary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,

  },
  headerRight: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: 'roboto-medium',
    letterSpacing: 1.8
  }
})
export default Page
