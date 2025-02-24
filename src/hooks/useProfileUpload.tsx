import { useState } from "react";
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker';
import { Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { getItemAsync, setItemAsync } from "expo-secure-store";

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
    const dir = await FileSystem.getInfoAsync(imgDir);
    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
}
export const useProfileUpload = () => {
    const { setUserState, userState } = useAuth()

    const [image, setImage] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const { authState } = useAuth()

    // useEffect(() => {
    //     loadImage()
    // }, [])

    // const loadImage = async () => {
    //     ensureDirExists()
    //     const files = await FileSystem.readDirectoryAsync(imgDir,);
    //     if (files.length > 0) {
    //         setImage(files.map(f => imgDir + f))
    //     }
    // }
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return false;
        }
        return true;
    };

    const pickImage = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        if (!result.canceled && result.assets && result.assets.length > 0) {
            saveImage(result.assets![0].uri)
            uploadImage(result.assets![0].uri)

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
        setImage(dest)

    }
    // update_upload

    const deleteImage = async (uri: string) => {
        await FileSystem.deleteAsync(uri)
        setImage('')
    }
    const uploadImage = async (uri: string) => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('avatar', {
                uri: uri,
                name: 'image.jpg',
                type: 'image/jpeg',
            } as any);

            console.log('j',formData)

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/upload_avatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authState?.token}`,
                },
                body: formData
            })

            const data = await response.json()

            console.log('Image data', data)
            if (response.ok) {
                Alert.alert(data?.message)
                setUserState!(prevState => {
                    return {
                        ...prevState,
                        avatar_url: data?.user?.avatar_url
                    }

                })
                await setItemAsync('user', JSON.stringify(userState))
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
    return {
        image,
        loading,
        pickImage,
    }
}

