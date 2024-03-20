import { View, Text, Pressable, FlatList, } from 'react-native'
import React, { useRef, useState } from 'react'
import { JobPropType } from '@/types/job'
import Colors from '@/constants/Colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Proposal from '@/app/(screens)/proposals'
import { jobListStyle } from '@/constants/styles'
import { useTask, useTaskProps } from '@/contexts/TaskContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import Loader from './loader'
import NotFound from '@/components/not-found'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import TaskForm from '@/app/(modals)/task-form'
import { TaskType } from '@/types/task'

const JobList = ({ tasks }: { tasks?: Array<JobPropType> }) => {
    const [jobId, setJobId] = useState<number | null>(null)
    const router = useRouter()
    const [visible, setVisible] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const jobRef = useRef<FlatList<JobPropType> | null>(null)
    const { userState, authState } = useAuth()
    const { setPageNumber, loading, fetchTask } = useTask()
    const [details, setDetails] = useState<TaskType | null>(null)
    const { setTaskForm } = useTaskProps()
    const handlePress = (jobId: number) => {
        if (userState?.user_role === 'handyman') {
            router.push(`/job-listing/${jobId}`)
        }
    }
    const [isloading, setisLoading] = useState(false)
    const handleDelete = async (taskId: number) => {
        try {
            setisLoading(true)
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/tasks/${taskId}/destroy`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authState?.token}`
                }
            })
            const data = await response.json()
            if (!response.ok) {
                let error
                if (data && data.errors) {
                    error = data.errors
                }
                else {
                    error = "Error deleting job"
                }
                throw new Error(error)
            }

        } catch (error: any) {
            console.log("Error deleting job", error.message)
        }
        finally {
            setisLoading(false)
        }
    }
    const renderMyJobs = ({ item }: { item: JobPropType }) => {
        return (
            <Pressable onPress={() => handlePress(item.id!)}>
                <View key={item.id} style={jobListStyle.jobContainer}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'center' }}>
                        <Text
                            onPress={() => {
                                setJobId(item.id!)
                                setVisible(!visible)
                                // router.push('/(modals)/appointment-form')
                            }}
                            style={[jobListStyle.jobText,
                            ...[userState?.user_role === 'client' ?
                                { color: Colors.secondary } : item.available ?
                                    { color: 'green' } : { color: 'red' }],
                            { textAlign: 'right' },
                            { fontFamily: 'roboto-bold' }]}>
                            {userState?.user_role === 'client' ? "View Proposals" :
                                item.available ? "Available" : "Not Available"}
                        </Text>
                        {
                            userState?.user_role === 'client' &&
                            <Menu>
                                <MenuTrigger
                                    style={{
                                        padding: 5,
                                        paddingHorizontal: 10
                                    }}>
                                    <Ionicons name="ellipsis-vertical" size={18} color="gray" />
                                </MenuTrigger>
                                <MenuOptions customStyles={
                                    {
                                        optionsContainer: {
                                            backgroundColor: 'white',
                                            padding: 5,
                                            borderRadius: 5,
                                            width: 100,
                                        }
                                    }
                                }>
                                    <MenuOption style={{ width: 100, }} onSelect={async () => {
                                        const data: TaskType = await fetchTask!(item.id!)
                                        setDetails(data)
                                        setIsVisible(true)
                                    }}>
                                        <Text style={{
                                            padding: 5,
                                            paddingHorizontal: 10,
                                            fontFamily: 'roboto-bold'
                                        }} >Edit</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={() => handleDelete(item.id!)} style={{ width: 100, }}>
                                        <Text style={{
                                            padding: 5,
                                            paddingHorizontal: 10,
                                            fontFamily: 'roboto-bold'
                                        }} >Delete</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        }

                    </View>

                    <View style={jobListStyle.jobBody}>
                        <Text style={
                            [jobListStyle.jobText,
                            {
                                fontSize: 18,
                                fontFamily: "roboto-bold",
                                letterSpacing: 1.8
                            }]}>
                            {item?.job_title}
                        </Text>
                        <Text style={
                            [jobListStyle.jobText,
                            { fontFamily: 'roboto-medium' }]}>
                            {item?.job_category}
                        </Text>
                        <Pressable style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <MaterialIcons name="location-pin" size={16} color={Colors.secondary} />
                            <Text style={[jobListStyle.jobText, { fontSize: 10 }]}>
                                {item.job_location}
                            </Text>
                        </Pressable>
                    </View>
                    <View style={jobListStyle.jobFooter}>
                        <Text style={[jobListStyle.jobText, { fontSize: 12 }]}>{item?.job_price}</Text>
                        <Text style={[jobListStyle.jobText, { fontSize: 12 }]}>{item?.duration_label}</Text>
                    </View>
                </View>
            </Pressable >
        )
    }
    return (
        <>
            {
                tasks?.length === 0 &&
                <NotFound />
            }

            <>
                <FlatList
                    ref={jobRef}
                    data={tasks || []}
                    renderItem={renderMyJobs}
                    style={{ width: '100%', height: '100%', padding: 10 }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                />
                <Proposal visible={visible} setVisible={setVisible} taskId={jobId} />
            </>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                position: 'absolute',
                top: '84%',
            }}>
                <Pressable style={{
                    alignSelf: 'flex-end',
                    paddingBottom: 100,
                    paddingHorizontal: 20,
                }} onPress={() => {
                    setPageNumber!((prevPage) => prevPage === 1 ? 1 : prevPage - 1)
                }}>
                    <Ionicons name="arrow-back-circle" color={Colors.primary} size={30} />
                </Pressable>

                <Pressable style={{
                    alignSelf: 'flex-end',
                    paddingBottom: 100,
                    paddingHorizontal: 20,
                }} onPress={() => {
                    setPageNumber!((prevPage) => prevPage + 1)
                }}>
                    <Ionicons name='arrow-forward-circle' color={Colors.primary} size={30} />
                </Pressable>
            </View>

            <TaskForm {...{ isVisible, setIsVisible, details }} />
            <Loader isLoading={loading! || isloading} />
        </>
    )
}



export default JobList