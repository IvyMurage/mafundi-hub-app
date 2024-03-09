import { View, Text, FlatList, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useHandymanId } from '@/contexts/HandymanIdContext'
import { useAuth } from '@/contexts/AuthContext'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'

type ReviewType = {
    id: number,
    comment: string,
    rating: number | null,
    handyman_id: number,
    client_avatar: string | null,
    client_name: string,
    created_at: string
}
const Reviews = () => {
    const handyman_id = useHandymanId()
    const { authState } = useAuth()
    const [reviews, setReviews] = useState<ReviewType[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reviews?handyman_id=${handyman_id}`, {
                    headers: { 'Authorization': `Bearer ${authState?.token}` }
                })
                const data = await response.json()

                if (response.ok) {
                    setReviews(data?.reviews)
                    console.log('Reviews', data)
                }
            } catch (error) {
                console.error('Error fetching reviews', error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchReviews()
    }, [])


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
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginVertical: 18 }}>
                <View style={{ alignSelf: 'flex-start', marginRight: 12 }}>
                    <Image
                        source={require('@/assets/images/placeholder.jpg')}
                        placeholder={require('@/assets/images/placeholder.jpg')}
                        placeholderContentFit='cover'
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                    />
                </View>
                <View style={{ maxWidth: '80%' }}>
                    <View style={{ alignSelf: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'roboto-bold', letterSpacing: 1 }}>Jane Doe</Text>
                        {rating(5)}
                    </View>
                    <View>
                        <Text style={{ textAlign: 'justify', fontFamily: 'roboto', fontSize: 14, letterSpacing: 1 }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Consequatur rem dolorem vero dolores nesciunt eum obcaecati maxime,
                            optio velit beatae molestiae dolor eaque vitae,
                            iste architecto pariatur distinctio repudiandae libero!
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )


}



export default Reviews