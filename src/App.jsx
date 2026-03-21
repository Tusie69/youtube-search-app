import React, { useState, useEffect } from 'react';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('ReactJS tutorial');
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  const fetchVideos = async (query, pageToken = '') => {
    setLoading(true);
    try {
      const response = await youtube.get('/search', {
        params: {
          q: query,
          pageToken: pageToken
        }
      });
      setVideos(response.data.items);
      setNextPageToken(response.data.nextPageToken || null);
      setPrevPageToken(response.data.prevPageToken || null);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(searchTerm);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchVideos(term);
  };

  const handlePageChange = (direction) => {
    const token = direction === 'next' ? nextPageToken : prevPageToken;
    if (token) {
      fetchVideos(searchTerm, token);
      window.scrollTo(0, 0);
    }
  };

  return (
      <div className="app-shell">
        <nav className="app-nav">
          <h1 className="app-title">MyTube Search</h1>
        </nav>

        <SearchBar onSearch={handleSearch} />

        {loading ? (
            <div className="loading-wrap">
              <div className="loading-spinner"></div>
            </div>
        ) : (
            <VideoList
                videos={videos}
                onVideoSelect={(video) => setSelectedVideo(video)}
                onPageChange={handlePageChange}
                hasNextPage={!!nextPageToken}
                hasPrevPage={!!prevPageToken}
            />
        )}

        <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
        />
      </div>
  );
}

export default App;