import { View, Text, FlatList, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useHandymanId } from '@/contexts/HandymanIdContext'
import { useAuth } from '@/contexts/AuthContext'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'

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

    const renderReviews = ({ item }: { item: ReviewType }) => {
        return (
            <View>
                <View>
                    <Image source={{ uri: item.client_avatar! }} placeholder={require('@/assets/images/placeholder.jpg')} style={{ width: 200, height: 200 }} />
                </View>
                <View>
                    <View>
                        <Text>Jane Doe</Text>
                        {Array.from(JSON.stringify(5)).map((_, index) => <Ionicons name='star-sharp' size={15} color='gold' key={index} />)}
                    </View>
                    <View>
                        <Text>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Consequatur rem dolorem vero dolores nesciunt eum obcaecati maxime,
                            optio velit beatae molestiae dolor eaque vitae,
                            iste architecto pariatur distinctio repudiandae libero!
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    return (

        <View>
            <View>
                <Image source={require('@/assets/images/placeholder.jpg')} placeholder={require('@/assets/images/placeholder.jpg')} style={{ width: 200, height: 200 }} />
            </View>
            <View>
                <View>
                    <Text>Jane Doe</Text>
                    {Array.from(JSON.stringify(5)).map((_, index) => <Ionicons name='star-sharp' size={15} color='gold' key={index} />)}
                </View>
                <View>
                    <Text>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Consequatur rem dolorem vero dolores nesciunt eum obcaecati maxime,
                        optio velit beatae molestiae dolor eaque vitae,
                        iste architecto pariatur distinctio repudiandae libero!
                    </Text>
                </View>
            </View>
        </View>

    )


}



export default Reviews