import { View, Text, Modal, SafeAreaView, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { request } from '@/utils/executePostRequest';
import { ReviewType } from '@/components/reviews';

export type ReviewTypeForm = {
    comment: string,
    rating?: string | null,
    handyman_id: number | null,
}
export type ReviewTypeEntry = ReviewTypeForm & { id: number | null }
const ReviewForm = ({ visible, setVisible, id, details, setReviews }: {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>,
    id: string,
    details?: ReviewTypeEntry,
    setReviews: Dispatch<SetStateAction<ReviewType[]>>,
}) => {
    const [review, setReview] = useState<ReviewTypeForm>({
        comment: '',
        rating: '',
        handyman_id: parseInt(id),
    });
    const [loading, setLoading] = useState(false)
    const { authState } = useAuth()
    const exists = !!details?.id

    useEffect(() => {
        let mounted = true
        if(mounted && exists) {
            setReview({
                comment: details?.comment || '',
                rating: details?.rating || '',
                handyman_id: parseInt(id),
            })
        }
   
    }, [details, exists]);

    const create = async () => {
        setLoading(true)
        try {
            const payload = {
                ...review,
                rating: parseInt(review.rating!)
            }
            const { response, data } = await request('POST', JSON.stringify(payload), 'reviews/create', authState?.token!)

            if (response.ok) {
                setReviews(prevReviews => [data?.review, ...prevReviews])
                setReview({
                    comment: '',
                    rating: '',
                    handyman_id: parseInt(id),
                })
                setVisible(false)
            }
            if (!response.ok) {
                throw new Error(data.error)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally { setLoading(false) }
    }

    const update = async () => {
        setLoading(true)
        try {
            const payload = {
                ...review,
                rating: parseInt(review.rating!)
            }
            const { response, data } = await request('PATCH', JSON.stringify(payload), `reviews/${details?.id}/update`, authState?.token!)

            if (response.ok) {
                setReviews(prevReviews => prevReviews.map(review => {
                    if (review.id === details?.id) return data?.review
                    return review
                }
                ))
                setVisible(false)
            }
            if (!response.ok) {
                throw new Error(data.error)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Modal animationType='slide' visible={visible} transparent>
            <SafeAreaView style={{
                flex: 1,
                paddingTop: 20,
                backgroundColor: 'rgba(0,0,0,0.6)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Ionicons name='close-circle-outline' color={Colors.lighter} size={20} style={{ alignSelf: 'flex-start', padding: 20 }} onPress={() => setVisible(false)} />
                <View style={{
                    backgroundColor: Colors.lighter,
                    width: '90%',
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    marginHorizontal: 20,
                    borderRadius: 20
                }}>
                    <Text style={{ fontSize: 20, fontFamily: 'roboto-bold' }}>{exists ? 'Edit' : 'Create'} Review</Text>
                    <TextInput
                        value={review.comment || ''}
                        onChangeText={(text) => setReview({ ...review, comment: text })}
                        multiline
                        numberOfLines={4}
                        placeholder='Leave a review'
                        style={{
                            borderBottomWidth: 1,
                            borderColor: Colors.secondary,
                            fontFamily: 'roboto',
                            letterSpacing: 1.2
                        }}
                    />
                    <TextInput
                        value={review.rating?.toString() || ''}
                        onChangeText={(text) => setReview({ ...review, rating: text })}
                        placeholder='Rating(e.g 1, 5)'
                        style={{
                            borderBottomWidth: 1,
                            paddingVertical: 20,
                            borderColor: Colors.secondary,
                            fontFamily: 'roboto',
                            letterSpacing: 1.2
                        }}
                    />

                    <Pressable style={{
                        padding: 15,
                        backgroundColor: Colors.secondary,
                        marginTop: 10,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}
                        onPress={exists ? () => update() : () => create()}
                    >
                        {loading && <ActivityIndicator size='small' color="white" />}
                        <Text
                            style={{
                                fontFamily: 'roboto-bold',
                                letterSpacing: 1.2,
                                fontSize: 20,
                                color: Colors.light
                            }}
                        >Submit</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </Modal>

    )
}

export default ReviewForm