import axios from 'axios';

export const fetchVenues = async () => {
    return await axios.get('/api/public/sport/venues');
};

export const fetchSports = async () => {
    return await axios.get('/api/public/sport/types');
};