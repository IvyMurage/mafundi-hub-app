import React, { useState } from 'react'
import Select from '@/components/select'
import { View, Text, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useService } from '@/hooks/useService'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { Formik } from 'formik'

type TaskFormProps = {
    job_title: string,
    service_id: string,
    job_price: string,
    duration_label: string,
    instant_booking: string,
    location_attributes: string,
    task_description: string,
    task_responsibilities: string,
}
const TaskForm = () => {
    const services = useService()
    const locations = useLocation()
    const [taskForm, setTaskForm] = useState<TaskFormProps>({
        job_title: '',
        service_id: '',
        job_price: '',
        duration_label: '',
        instant_booking: '',
        location_attributes: '',
        task_description: '',
        task_responsibilities: '',
    })
    const handleSubmit = (taskForm: TaskFormProps) => {
        console.log(taskForm)
    }


    return (
        <Formik
            initialValues={taskForm}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                <SafeAreaView>
                    <View>
                        <Text>Create Task</Text>
                        <View>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoFocus={true}
                                keyboardType='default'
                                placeholder='Title (e.g. "Cleaning")'
                                returnKeyLabel='next'
                                value={values.job_title}
                            />
                        </View>
                        <View>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoFocus={true}
                                returnKeyLabel='next'
                                keyboardType='default'
                                inputMode='decimal'
                                placeholder="Job price"
                                value={values.job_price}
                            />
                            <Select
                                data={services || []}
                                searchPlaceHolder='Search for a service'
                                handleChange={(value) => setFieldValue('service_id', value)}
                                defaultButtonText='Service'
                                profile={false}

                            />
                        </View>

                        <View>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoFocus={true}
                                keyboardType='default'
                                placeholder='Duratuion (e.g. "2 hours")'
                                returnKeyLabel='next'
                                value={values.duration_label}
                            />
                            <Select
                                data={[{ label: 'true', value: 'true' }, { label: 'true', value: 'false' }] || []}
                                searchPlaceHolder='Search for a service'
                                handleChange={(value) => setFieldValue('instant_booking', value)}
                                defaultButtonText='Instant Booking'
                                profile={false}
                            />
                        </View>

                        <View>
                            <Select
                                data={locations?.length > 0 &&
                                    locations !== undefined &&
                                    locations?.map(location => { return { label: stringfy(location), value: stringfy(location) } }) || []}
                                defaultButtonText='Location'
                                handleChange={(value) => setFieldValue('location_attributes', value)}
                                searchPlaceHolder='Search for a Location'
                                profile={false}
                            />
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
                                value={values.task_description}
                            />
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
                                value={values.task_responsibilities}
                            />
                        </View>

                        <Pressable>
                            <Text>Create Task</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            )}
        </Formik>
    )
}

export default TaskForm