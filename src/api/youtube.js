import axios from 'axios';

const KEY = 'AIzaSyAUGmI7OyIuSOHPxjHtxbKj_Q71rbxtHqk';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY,
        type: 'video'
    }
});