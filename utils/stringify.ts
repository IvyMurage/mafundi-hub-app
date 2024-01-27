export const stringfy = (location: {
  city: string;
  county: string;
  country: string;
  location_id: number;
}) => {
    return `${location.city}, ${location.county}, ${location.country}`;
};
