import { useEffect, useState } from "react";

export const useLocation = () => {
    const [locations, setLocations] = useState<{ city: string; county: string; country: string; location_id: number }[]>([])
    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await fetch('http://api.geonames.org/searchJSON?country=KE&featureCode=PPL&username=ivymurage')
                const data = await response.json()
                // console.log(data)
                if (response.ok) {
                    setLocations(data?.geonames?.map((
                        location: {
                            name: string;
                            adminName1: string;
                            countryName: string;
                            geonameId: number;
                        }) => {
                        return {
                            city: location.name,
                            county: location.adminName1,
                            country: location.countryName,
                            location_id: location.geonameId
                        }
                    }))
                }
            }
            catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        getLocation()
    }, []);
    return locations
}