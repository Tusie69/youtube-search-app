import axios from 'axios';

const KEY = 'AIzaSyDKl05RcG5StQBCI1HoDk0F4kHcGvMrsLY';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY,
        type: 'video',
    },
});
