import { View, Text } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'
import ReviewForm, { ReviewTypeEntry } from '@/components/review-form'
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu'

export type ReviewType = {
    id: number,
    comment: string,
    rating: number | null,
    handyman_id: number,
    client_id: number,
    client_avatar: string | null,
    client_name: string,
    created_at: string
}
const Reviews = ({ id, visible, setVisible }: { id: string, visible: boolean; setVisible: Dispatch<SetStateAction<boolean>>, }) => {
    const { authState, userState } = useAuth()
    const [loading, setLoading] = useState(false)

    const [reviews, setReviews] = useState<ReviewType[]>([])
    const [details, setDetails] = useState<ReviewTypeEntry>({
        id: null,
        comment: '',
        rating: null,
        handyman_id: parseInt(id),
    })
    const [success, setSuccess] = useState('')

    const [reviewId, setReviewId] = useState<number | null>(null)

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reviews?handyman_id=${id}`, {
                    headers: { 'Authorization': `Bearer ${authState?.token}` }
                })
                const data = await response.json()
                if (response.ok) {
                    setReviews(data?.reviews)
                }
            } catch (error) {
                console.error('Error fetching reviews', error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchReviews()
    }, [id])

    useEffect(() => {
        const getReview = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reviews/${reviewId}/show`, {
                    headers: { 'Authorization': `Bearer ${authState?.token}` }
                })
                const data = await response.json()
                if (response.ok) {
                    setDetails(data)
                }
            }
            catch (error) {
                if (error instanceof Error) console.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        getReview()
    }, [reviewId])

    const deleteReview = async (reviewId: number) => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reviews/${reviewId}/destroy`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authState?.token}` }
            })
            const data = await response.json()
            if (response.ok) {
                setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId))
                setSuccess(data)
            }
        }
        catch (error) {
            if (error instanceof Error) console.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    const rating = (rating: number) => {
        const stars = []
        for (let i = 0; i < rating; i++) {
            stars.push(<Ionicons name='star-sharp' size={12} key={i} color={Colors.secondary} />
            )
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                {stars}
            </View>
        )
    }
    const reviewList = reviews.map(review => {
        return (<View key={review.id} style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.lighter,
            justifyContent: 'space-between',
            width: '100%',
            marginVertical: 18,
            padding: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            <View style={{ alignSelf: 'flex-start', marginRight: 12 }}>
                <Image
                    source={{ uri: review.client_avatar! }}
                    placeholder={require('@/assets/images/placeholder.jpg')}
                    placeholderContentFit='cover'
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
            </View>
            <View style={{ maxWidth: '80%', }}>
                <View style={{ alignSelf: 'flex-end', justifyContent: 'center', }}>
                    <Text style={{ fontFamily: 'roboto-bold', letterSpacing: 1, flexWrap:'wrap' }}>{review.client_name}</Text>
                    {rating(review.rating!)}
                </View>
                <View>
                    <Text style={{ textAlign: 'justify', fontFamily: 'roboto', fontSize: 14, letterSpacing: 1 }}>
                        {review.comment}
                    </Text>
                </View>
            </View>

            <View style={{ alignSelf: 'flex-start' }}>
                {review.client_id === userState?.user_id && <Menu>
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
                        <MenuOption style={{ width: 100, }} onSelect={() => {
                            setReviewId(review.id);
                            setVisible(true);
                        }}>
                            <Text style={{
                                padding: 5,
                                paddingHorizontal: 10,
                                fontFamily: 'roboto-bold'
                            }} >Edit</Text>
                        </MenuOption>
                        <MenuOption style={{ width: 100, }} onSelect={() => {
                            deleteReview(review.id);
                        }}>
                            <Text style={{
                                padding: 5,
                                paddingHorizontal: 10,
                                fontFamily: 'roboto-bold'
                            }} >Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>}
            </View>
        </View>)
    })
    return (
        <>
            {reviewList.length === 0 && <View style={{ alignItems: 'center' }}><Text style={{ textAlign: 'center', fontFamily: 'roboto-bold', letterSpacing: 1.2 }}>No Reviews posted</Text></View>}
            {reviewList}
            <ReviewForm {...{ visible, setVisible, id, details, setReviews }} />
        </>
    )
}

export default Reviews