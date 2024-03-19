import React, { Dispatch, SetStateAction, useEffect, useState, } from 'react'
import Select from '@/components/select'
import { View, Text, TextInput, Pressable, Modal, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useService } from '@/hooks/useService'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { Formik } from 'formik'
import { taskSchema } from '@/constants/validation-schema'
import { defaultStyles, taskFormStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons/'
import CustomAlert from '@/components/customAlert'
import { useRouter } from 'expo-router'
import { TaskProvider, useTask, useTaskProps } from '@/contexts/TaskContext'
import { TaskFormProps, TaskType } from '@/types/task'
import { request } from '@/utils/executePostRequest'
import * as SecureStore from 'expo-secure-store'
import { useAuth } from '@/contexts/AuthContext'
import handleExeception from '@/utils/handleExeception'

const TaskForm = (props: { isVisible: boolean, setIsVisible: Dispatch<SetStateAction<boolean>>, details: TaskType | null }) => {
    const router = useRouter()
    const { isVisible, setIsVisible, details } = props
    const services = useService()
    const { locations } = useLocation()
    const { taskForm } = useTaskProps()
    const [dets, setDetails] = useState<TaskFormProps>({
        job_title: '',
        service_id: '',
        job_price: '',
        duration_label: '',
        instant_booking: '',
        location_attributes: '',
        task_description: '',
        task_responsibilities: '',
    })
    const { handleSubmit, handleRoute, isLoading, error, isError, visible, setVisible, tasks } = useTask()
    const { userState, authState } = useAuth()
    const [loading, setLoading] = useState(false)
    const getValue = async () => {
        const value = await handleRoute!()
        if (value && value === 'true') {
            router.push('/(screens)/handymen')
        }
        else {
            router.push('/(tabs)/jobs')
        }
    }
    const service_id = services?.find(service => service.label === details?.service_name)?.value

    useEffect(() => {
        let mounted = true
        if (details && mounted) {
            setDetails({
                job_title: details.job_title,
                job_price: details.job_price!,
                duration_label: details?.duration_label!,
                instant_booking: details?.available ? 'true' : 'false',
                service_id: service_id!,
                location_attributes: `${details.location.city}, ${details.location.county}, ${details.location.country}`,
                task_responsibilities: details?.task_responsibilities.join(', '),
                task_description: details?.task_description,
            })
        }
    }, [details])

    const exists = !!details?.id


    const updateTask = async (taskId: number) => {
        setLoading(true)
        try {
            const location = taskForm.location_attributes?.split(', ')
            const payload = {
                ...taskForm,
                service_id: parseInt(taskForm.service_id!),
                location_attributes: {
                    city: location![0],
                    county: location![1],
                    country: location![2],
                },
                job_price: parseInt(taskForm.job_price!),
                instant_booking: taskForm.instant_booking === 'true' ? true : false,
                task_responsibilities: taskForm.task_responsibilities?.trim().split(', '),
                client_id: userState?.user_id
            }

            await SecureStore.setItemAsync('service_id', taskForm.service_id!)
            await SecureStore.setItemAsync('instant_book', taskForm.instant_booking!)

            const { response, data } = await request('PUT', JSON.stringify(payload), `tasks/${taskId}/create`, authState?.token!)
            if (response.ok) {
                // setTasks(prevTasks => [{
                //     id: data.id,
                //     job_title: data.job_title,
                //     job_location: `${data.location.city}, ${data.location.county}, ${data.location.country}`,
                //     job_date: data.created_at,
                //     job_price: `ksh.${data.job_price}`,
                //     job_category: data.service_name,
                //     duration_label: data.duration_label,
                //     available: data.available
                // }, ...prevTasks,])
                console.log(data)
            }

            if (!response.ok) {
                throw new Error(data.error)
            }
            if (response.status === 500) throw new Error('Something went wrong')

        }
        catch (error) {
            if (error instanceof Error) handleExeception({ error: error.message })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <TaskProvider>
            <Formik
                initialValues={taskForm || dets}
                onSubmit={exists ? () => updateTask(details.id) : (values, resetForm) => handleSubmit?.(values, resetForm)}
                validationSchema={taskSchema}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldValue, setFieldTouched, touched, isValid }) => (
                    < Modal animationType='slide' visible={isVisible} transparent>
                        <SafeAreaView style={taskFormStyles.safeareaStyle}>
                            <ScrollView style={taskFormStyles.scroll} contentContainerStyle={taskFormStyles.contentStyle}>
                                <View style={taskFormStyles.container}>
                                    <View style={taskFormStyles.headerStyle}>
                                        <Text style={taskFormStyles.headerTextStyle}>{exists ? 'Edit Task' : 'Create Task'}</Text>
                                        <Pressable onPress={() => setIsVisible(!isVisible)} style={{ alignSelf: 'flex-end' }}>
                                            <Octicons name='x-circle' size={24} />
                                        </Pressable>
                                    </View>

                                    <View style={taskFormStyles.viewTextContainer}>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <TextInput
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                autoFocus={true}
                                                keyboardType='default'
                                                placeholder='Title (e.g. "Cleaning")'
                                                returnKeyLabel='next'
                                                value={values.job_title || dets.job_title}
                                                onChangeText={handleChange('job_title')}
                                                onBlur={() => setFieldTouched('job_title')}
                                                style={[taskFormStyles.inputField, taskFormStyles.textInput]}
                                            />

                                            {
                                                touched.job_title && errors.job_title && (
                                                    <Text style={[defaultStyles.errorText]}>
                                                        {errors.job_title}
                                                    </Text>
                                                )
                                            }
                                        </View>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <TextInput
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                autoFocus={true}
                                                returnKeyLabel='next'
                                                keyboardType='default'
                                                inputMode='decimal'
                                                placeholder="Job price"
                                                value={values.job_price || dets.job_price}
                                                onChangeText={handleChange('job_price')}
                                                onBlur={() => setFieldTouched('job_price')}
                                                style={[taskFormStyles.inputField, taskFormStyles.textInput]}
                                            />

                                            {
                                                touched.job_price && errors.job_price && (
                                                    <Text style={[defaultStyles.errorText]}>
                                                        {errors.job_price}
                                                    </Text>
                                                )
                                            }
                                        </View>
                                    </View>

                                    <View style={taskFormStyles.viewTextContainer}>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <TextInput
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                autoFocus={true}
                                                keyboardType='default'
                                                placeholder='Duratuion (e.g. "2 hours")'
                                                returnKeyLabel='next'
                                                value={values.duration_label || dets.duration_label}
                                                onChangeText={handleChange('duration_label')}
                                                onBlur={() => setFieldTouched('duration_label')}
                                                style={[taskFormStyles.textInput, taskFormStyles.inputField]}
                                            />
                                        </View>
                                        <View style={{ marginHorizontal: 5, marginBottom: 10 }}>
                                            <Select
                                                data={[{ label: 'true', value: 'true' }, { label: 'false', value: 'false' }] || []}
                                                searchPlaceHolder='Instant booking'
                                                handleChange={(value) => setFieldValue('instant_booking', value)}
                                                defaultButtonText={dets.instant_booking || 'Instant booking'}
                                                profile={false}
                                                task={true}
                                                buttonStyle={taskFormStyles.taskStyles}
                                            />
                                        </View>



                                    </View>

                                    <View style={taskFormStyles.viewTextContainer}>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Select
                                                data={services || []}
                                                searchPlaceHolder='Search for a service'
                                                handleChange={(value) => setFieldValue('service_id', value)}
                                                defaultButtonText={details?.service_name || 'Service'}
                                                profile={false}
                                                buttonStyle={taskFormStyles.taskStyles}
                                                task={true}
                                            />

                                            {
                                                touched.service_id && errors.service_id && (
                                                    <Text style={[defaultStyles.errorText]}>
                                                        {errors.service_id}
                                                    </Text>
                                                )
                                            }
                                        </View>

                                        <View style={{ marginHorizontal: 5 }}>
                                            <Select
                                                data={locations?.length > 0 &&
                                                    locations !== undefined &&
                                                    locations?.map(location => {
                                                        return { label: stringfy(location), value: stringfy(location) }
                                                    }) || []}
                                                defaultButtonText={dets.location_attributes || 'Location'}
                                                handleChange={(value) => setFieldValue('location_attributes', value)}
                                                searchPlaceHolder='Search for a Location'
                                                profile={false}
                                                task={true}
                                                buttonStyle={taskFormStyles.taskStyles}
                                            />

                                            {
                                                touched.location_attributes && errors.location_attributes && (
                                                    <Text style={[defaultStyles.errorText]}>
                                                        {errors.location_attributes}
                                                    </Text>
                                                )
                                            }
                                        </View>
                                    </View>

                                    <View>
                                        <TextInput
                                            multiline={true}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            autoFocus={true}
                                            keyboardType='default'
                                            placeholder='Description (e.g. "Cleaning")'
                                            numberOfLines={10}
                                            returnKeyLabel='next'
                                            value={values.task_description || dets.task_description}
                                            onChangeText={handleChange('task_description')}
                                            onBlur={() => setFieldTouched('task_description')}
                                            style={[taskFormStyles.textarea, taskFormStyles.textInput]}
                                        />

                                        {
                                            touched.task_description && errors.task_description && (
                                                <Text style={[defaultStyles.errorText]}>
                                                    {errors.task_description}
                                                </Text>
                                            )
                                        }
                                    </View>
                                    <View>
                                        <TextInput
                                            multiline={true}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            autoFocus={true}
                                            keyboardType='default'
                                            placeholder='Task responsibilities separated by comma (e.g. "Cleaning")'
                                            numberOfLines={10}
                                            returnKeyLabel='Done'
                                            value={values.task_responsibilities || dets.task_responsibilities}
                                            onChangeText={handleChange('task_responsibilities')}
                                            onBlur={() => setFieldTouched('task_responsibilities')}
                                            style={[taskFormStyles.textarea, taskFormStyles.textInput]}
                                        />
                                    </View>
                                    <Pressable
                                        disabled={exists? isValid : !isValid}
                                        style={[defaultStyles.authButton,
                                        {
                                            backgroundColor: isValid ? Colors.primary : '#a5c9ca',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex",
                                            flexDirection: "row",
                                        }]}
                                        onPress={exists ? () => updateTask(details.id) : () => handleSubmit()}>
                                        {isLoading && <ActivityIndicator size="large" color="white" />}
                                        <Text style={[defaultStyles.authButtonText]}>{exists ? 'Update Task' : 'Create Task'}</Text>
                                    </Pressable>
                                </View>
                                <CustomAlert
                                    visible={visible!}
                                    message='Task created successfully'
                                    onClose={() => {
                                        setVisible?.(false)
                                        setIsVisible(false)
                                        getValue()
                                    }}
                                />
                                {
                                    isError && error && (
                                        <CustomAlert
                                            visible={visible!}
                                            message={error}
                                            onClose={() => setVisible?.(false)}
                                        />
                                    )
                                }
                            </ScrollView>
                        </SafeAreaView>
                    </Modal>
                )
                }
            </Formik >
        </TaskProvider >
    )
}

export default TaskForm