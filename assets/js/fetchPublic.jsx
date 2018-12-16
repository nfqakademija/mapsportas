import axios from 'axios';

export const fetchVenues = async (perPage, first, sportId) => {
    return await axios.get('/api/public/sport/venues/' + perPage + '/' + first + '/' + sportId);
};

export const fetchSports = async () => {
    return await axios.get('/api/public/sport/types');
};

export const fetchEvents = async () => {
    return await axios.get('/api/public/sport/events');
};

export const fetchEventsUpcoming = async (i,first) => {
    return await axios.get('/api/public/sport/events/upcoming/' + i + '/' + first);
};

export const fetchUser = async (token) => {
    return  await axios.get('/api/user', {headers: { Authorization: `Bearer ${token}`,}});
};