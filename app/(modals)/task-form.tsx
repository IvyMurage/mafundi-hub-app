import React, { useState } from 'react'
import Select from '@/components/select'
import { View, Text, TextInput, Pressable, Modal, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useService } from '@/hooks/useService'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { Formik } from 'formik'
import { taskSchema } from '@/constants/validation-schema'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'

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
const TaskForm = (props: { isVisible: boolean }) => {
    const { isVisible } = props
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
            validationSchema={taskSchema}
        >
            {({ handleChange, handleSubmit, values, errors, setFieldValue, setFieldTouched, }) => (
                <Modal animationType='slide' visible={isVisible}>
                    <SafeAreaView style={{ paddingVertical: 20, paddingHorizontal: 10, flex: 1 }}>
                        <ScrollView style={taskFormStyles.scroll} contentContainerStyle={taskFormStyles.contentStyle}>
                            <View style={taskFormStyles.container}>
                                <Text>Create Task on Mafundi</Text>
                                <View style={taskFormStyles.viewTextContainer}>
                                    <TextInput
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        autoFocus={true}
                                        keyboardType='default'
                                        placeholder='Title (e.g. "Cleaning")'
                                        returnKeyLabel='next'
                                        value={values.job_title}
                                        onChangeText={handleChange('job_title')}
                                        onBlur={() => setFieldTouched('job_title')}
                                        style={[taskFormStyles.inputField, taskFormStyles.textInput]}
                                    />

                                    <TextInput
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        autoFocus={true}
                                        returnKeyLabel='next'
                                        keyboardType='default'
                                        inputMode='decimal'
                                        placeholder="Job price"
                                        value={values.job_price}
                                        onChangeText={handleChange('job_price')}
                                        onBlur={() => setFieldTouched('job_price')}
                                        style={[taskFormStyles.inputField, taskFormStyles.textInput]}
                                    />
                                </View>

                                <View style={taskFormStyles.viewTextContainer}>
                                    <TextInput
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        autoFocus={true}
                                        keyboardType='default'
                                        placeholder='Duratuion (e.g. "2 hours")'
                                        returnKeyLabel='next'
                                        value={values.duration_label}
                                        onChangeText={handleChange('duration_label')}
                                        onBlur={() => setFieldTouched('duration_label')}
                                        style={[taskFormStyles.textInput, taskFormStyles.inputField]}
                                    />
                                    <Select
                                        data={[{ label: 'true', value: 'true' }, { label: 'true', value: 'false' }] || []}
                                        searchPlaceHolder='Search for a service'
                                        handleChange={(value) => setFieldValue('instant_booking', value)}
                                        defaultButtonText='Instant Booking'
                                        profile={false}
                                        task={true}
                                    />
                                </View>

                                <View style={taskFormStyles.viewTextContainer}>

                                    <Select
                                        data={services || []}
                                        searchPlaceHolder='Search for a service'
                                        handleChange={(value) => setFieldValue('service_id', value)}
                                        defaultButtonText='Service'
                                        profile={false}
                                        task={true}
                                    />

                                    <Select
                                        data={locations?.length > 0 &&
                                            locations !== undefined &&
                                            locations?.map(location => {
                                                return { label: stringfy(location), value: stringfy(location) }
                                            }) || []}
                                        defaultButtonText='Location'
                                        handleChange={(value) => setFieldValue('location_attributes', value)}
                                        searchPlaceHolder='Search for a Location'
                                        profile={false}
                                        task={true}
                                    />
                                </View>

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
                                    onChangeText={handleChange('task_description')}
                                    onBlur={() => setFieldTouched('task_description')}
                                    style={[taskFormStyles.textarea, taskFormStyles.textInput]}
                                />



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
                                    onChangeText={handleChange('task_responsibilities')}
                                    onBlur={() => setFieldTouched('task_responsibilities')}
                                    style={[taskFormStyles.textarea, taskFormStyles.textInput]}
                                />

                                <Pressable style={[defaultStyles.authButton, { backgroundColor: Colors.primary }]} onPress={() => handleSubmit}>
                                    <Text style={[defaultStyles.authButtonText]}>Create Task</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
            )
            }
        </Formik >
    )
}

const taskFormStyles = StyleSheet.create({
    scroll: {
        width: '100%',
        height: '100%',
    },
    contentStyle: {
        flexGrow: 1,
        alignItems: "center",
        marginTop: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 50
    
    },

    textInput: {
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    viewTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 50
    },
    inputField: {
        width: 180,
        fontFamily: 'poppins',
        fontSize: 14,
        height: 55,
        borderRadius: 10,
        padding: 15,
        borderColor: Colors.secondary
    },
    textarea: {
        width: 385,
        height: 120,
        borderRadius: 10,
        padding: 15,
        borderColor: Colors.secondary,
        fontFamily: 'poppins',
        marginBottom: 50
    }
})

export default TaskForm