import React, { createContext, useContext, useState } from 'react';

export type MapPropType = {
    city: string | null;
    country: string | null;
    county: string | null,
    latitude: number,
    longitude: number
    longitudeDelta?: number
    latitudeDelta?: number
}
interface LocationContextType {
    locations: MapPropType[];
    setLocations: React.Dispatch<React.SetStateAction<MapPropType[]>>
}

export const LocationContext = createContext<LocationContextType>({
    locations: [{
        city: '',
        country: '',
        county: '',
        latitude: 0,
        longitude: 0
    }],
    setLocations: () => { }
});

export const useLocations = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
}

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locations, setLocations] = useState<MapPropType[]>([]);
    return (
        <LocationContext.Provider value={{ locations, setLocations }}>
            {children}
        </LocationContext.Provider>
    );
};