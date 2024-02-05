import React, { Dispatch, SetStateAction, } from 'react'
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
import { useTaskPost, useTaskProps } from '@/hooks/useTask'
import { useRouter } from 'expo-router'
import { useTask } from '@/context/TaskContext'


const TaskForm = (props: { isVisible: boolean, setIsVisible: Dispatch<SetStateAction<boolean>> }) => {
    const router = useRouter()
    const { isVisible, setIsVisible } = props
    const services = useService()
    const locations = useLocation()
    const { taskForm } = useTaskProps()
    const { handleSubmit, isLoading, error, isError, visible, setVisible } = useTask()

    return (
        <Formik
            initialValues={taskForm}
            onSubmit={(values, resetForm) => handleSubmit?.(values, resetForm)}
            validationSchema={taskSchema}
        >
            {({ handleChange, handleSubmit, values, errors, setFieldValue, setFieldTouched, touched, isValid }) => (
                <Modal animationType='slide' visible={isVisible} transparent>
                    <SafeAreaView style={taskFormStyles.safeareaStyle}>
                        <ScrollView style={taskFormStyles.scroll} contentContainerStyle={taskFormStyles.contentStyle}>
                            <View style={taskFormStyles.container}>
                                <View style={taskFormStyles.headerStyle}>
                                    <Text style={taskFormStyles.headerTextStyle}>Create Task</Text>
                                    <Pressable onPress={() => setIsVisible(!isVisible)} style={{ alignSelf: 'flex-end' }}>
                                        <Octicons name='x-circle' size={24} />
                                    </Pressable>
                                </View>

                                <View style={taskFormStyles.viewTextContainer}>
                                    <View>
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

                                        {
                                            touched.job_title && errors.job_title && (
                                                <Text style={[defaultStyles.errorText]}>
                                                    {errors.job_title}
                                                </Text>
                                            )
                                        }
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
                                        data={[{ label: 'true', value: 'true' }, { label: 'false', value: 'false' }] || []}
                                        searchPlaceHolder='Instant booking'
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

                                    {
                                        touched.service_id && errors.service_id && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.service_id}
                                            </Text>
                                        )
                                    }

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

                                    {
                                        touched.location_attributes && errors.location_attributes && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.location_attributes}
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
                                        placeholder='Description (e.g. "Cleaning")'
                                        numberOfLines={10}
                                        returnKeyLabel='next'
                                        value={values.task_description}
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
                                        value={values.task_responsibilities}
                                        onChangeText={handleChange('task_responsibilities')}
                                        onBlur={() => setFieldTouched('task_responsibilities')}
                                        style={[taskFormStyles.textarea, taskFormStyles.textInput]}
                                    />
                                </View>
                                <Pressable
                                    disabled={!isValid}
                                    style={[defaultStyles.authButton,
                                    {
                                        backgroundColor: isValid ? Colors.primary : '#a5c9ca',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: "flex",
                                        flexDirection: "row",
                                    }]}
                                    onPress={() => handleSubmit()}>
                                    {isLoading && <ActivityIndicator size="large" color="white" />}
                                    <Text style={[defaultStyles.authButtonText]}>Create Task</Text>
                                </Pressable>
                            </View>
                            <CustomAlert
                                visible={visible!}
                                message='Task created successfully'
                                onClose={() => {
                                    setVisible?.(false)
                                    setIsVisible(false)
                                    router.push('/(tabs)/jobs')
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
    )
}

export default TaskForm