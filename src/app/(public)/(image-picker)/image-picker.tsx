import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, SafeAreaView, Pressable, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors';
import * as FileSystem from 'expo-file-system'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { getItemAsync } from 'expo-secure-store';
import { Stack, useRouter } from 'expo-router';
import CustomAlert from '@/components/customAlert';
import { set } from 'lodash';


const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
    const dir = await FileSystem.getInfoAsync(imgDir);
    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
}
export default function ImagePickerExample() {

    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState<string | null>(null)
    const router = useRouter()


    function ImageIcon(props: {
        name: React.ComponentProps<typeof FontAwesome5>['name'];
        color: string;
        size: number
    }) {
        return <FontAwesome5 style={{ marginBottom: -3, textAlign: 'center' }} {...props} />;
    }
    useEffect(() => {
        loadImage()
    }, [])

    const loadImage = async () => {
        ensureDirExists()
        const files = await FileSystem.readDirectoryAsync(imgDir,);
        if (files.length > 0) {
            setImages(files.map(f => imgDir + f))
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            saveImage(result.assets![0].uri)
        }
    };

    const saveImage = async (uri: string) => {
        await ensureDirExists();
        const filename = new Date().getTime() + '.jpg';
        const dest = imgDir + filename;
        await FileSystem.copyAsync({
            from: uri,
            to: dest
        })
        setImages([...images, dest])

    }
    // update_upload

    const deleteImage = async (uri: string) => {
        await FileSystem.deleteAsync(uri)
        setImages(images.filter(i => i != uri))
    }
    const uplaodImage = async (uri: string) => {
        const handyman_id = await getItemAsync('handyman_id')
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('work_photos', {
                uri: uri,
                name: 'image.jpg',
                type: 'image/jpeg',
            } as any);
            console.log(formData)
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/work_photos/?handyman_id=${handyman_id}`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            if (response.ok) {
                setData(data?.message)
                setVisible(true)


            }
        }
        catch (error) {
            console.log(error)
            Alert.alert('Image upload failed')
        }

        finally {
            setLoading(false)
        }
    }

    const renderItem = ({ item }: { item: string }) => {
        const filename = item.split('/').pop()

        return (
            <View style={imagePickerStyles.imageList}>
                <Image source={{ uri: item }} style={{ width: 80, height: 80 }} />
                <Text style={imagePickerStyles.imageText}>{filename}</Text>
                <Pressable onPress={() => { uplaodImage(item) }}>
                    <ImageIcon size={24} color={Colors.secondary} name='upload' />
                </Pressable>
                <Pressable onPress={() => { deleteImage(item) }}>
                    <ImageIcon size={24} color={Colors.secondary} name='trash' />
                </Pressable>
            </View>
        )
    }
    const handleBack = () => {
        router.back()
    }

    const handleRight = () => {
        router.push('/(public)/login')
    }

    return (
        <>
            <SafeAreaView style={imagePickerStyles.safeAreaStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 12 }}>
                    <Ionicons name="arrow-back" size={24} color={Colors.secondary} onPress={handleBack} />
                    <Text style={[imagePickerStyles.headerRight]} onPress={() => handleRight()}>Next</Text>
                </View>
                <Text style={imagePickerStyles.title}>Upload images of your work now</Text>
                <View style={imagePickerStyles.pickerStyle}>
                    <Pressable style={imagePickerStyles.pickerBtn} onPress={pickImage}><Text style={imagePickerStyles.pickerBtnText}>Upload Image</Text></Pressable>
                </View>

                <FlatList style={{ alignSelf: 'flex-start', paddingVertical: 25, paddingHorizontal: 20 }} data={images} renderItem={renderItem} />

                {loading && <View style={[StyleSheet.absoluteFill, {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}>
                    <ActivityIndicator color={"#fff"} animating size='large' />
                </View>}
                <CustomAlert
                    message={data!}
                    visible={visible}
                    onClose={() => setVisible(false)}
                />
            </SafeAreaView>
        </>
    );
}

const imagePickerStyles = StyleSheet.create({
    pickerStyle: {
        width: 355,
        height: 190,
        borderWidth: 4,
        borderRadius: 10,
        borderStyle: 'dotted',
        borderColor: Colors.secondary,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
    },
    safeAreaStyle: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 30
    },
    pickerBtn: {
        backgroundColor: Colors.secondary,
        paddingHorizontal: 60,
        paddingVertical: 20,
        borderRadius: 12
    },
    pickerBtnText: {
        fontFamily: 'roboto-medium',
        fontSize: 14,
        letterSpacing: 1.8,
        textAlign: 'left',
        color: Colors.lighter
    },
    title: {
        fontFamily: 'roboto-medium',
        fontSize: 16,
        letterSpacing: 1.8,
        textAlign: 'center',
        color: Colors.secondary,
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 20
    },
    imageList: {
        flexDirection: 'row',
        margin: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        width: '100%'
    },
    imageText: {
        color: Colors.lighter,
        fontFamily: 'roboto',
        fontSize: 14,
        letterSpacing: 1.8,
    }
})
