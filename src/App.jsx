import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import FavoritesPage from './components/FavoritesPage';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  const { currentUser, toggleFavorite } = useAuth();

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
        params: { q: query, pageToken }
      });

      setVideos(response.data.items || []);
      setNextPageToken(response.data.nextPageToken || null);
      setPrevPageToken(response.data.prevPageToken || null);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setVideos([]);
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

  const handleToggleFavorite = (video) => {
    const result = toggleFavorite(video);
    alert(result.message);
  };

  const isVideoFavorited = (video) => {
    if (!currentUser || !video) return false;
    const videoId = video?.id?.videoId || video?.id;
    return currentUser.favorites?.some(
        (item) => (item.id || item.videoId) === videoId
    );
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          <Route
              path="/"
              element={
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  <SearchBar onSearch={handleSearch} />

                  {loading ? (
                      <div className="flex min-h-[40vh] items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-600" />
                      </div>
                  ) : (
                      <VideoList
                          videos={videos}
                          onVideoSelect={(video) => setSelectedVideo(video)}
                          onPageChange={handlePageChange}
                          hasNextPage={!!nextPageToken}
                          hasPrevPage={!!prevPageToken}
                          onToggleFavorite={handleToggleFavorite}
                          isVideoFavorited={isVideoFavorited}
                      />
                  )}

                  <VideoModal
                      video={selectedVideo}
                      onClose={() => setSelectedVideo(null)}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorited={isVideoFavorited(selectedVideo)}
                  />
                </main>
              }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
              path="/favorites"
              element={
                <FavoritesPage
                    onSelectVideo={(video) => setSelectedVideo(video)}
                    onToggleFavorite={handleToggleFavorite}
                    isVideoFavorited={isVideoFavorited}
                />
              }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
            onToggleFavorite={handleToggleFavorite}
            isFavorited={isVideoFavorited(selectedVideo)}
        />
      </div>
  );
}

export default App;