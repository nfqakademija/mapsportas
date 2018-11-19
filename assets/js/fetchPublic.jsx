import axios from 'axios';

export const fetchVenues = async () => {
    return await axios.get('/api/public/sport/venues');
};

export const fetchVenuesLimited =  async () => {
    return await axios.get('/api/public/sport/venues/limited');
};

export const fetchSports = async () => {
    return await axios.get('/api/public/sport/types');
};

export const fetchEvents = async () => {
    return await axios.get('/api/public/sport/events');
};

export const fetchEventsUpcoming = async () => {
    return await axios.get('/api/public/sport/events/upcoming');
};