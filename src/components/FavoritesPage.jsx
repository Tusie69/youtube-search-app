import React from 'react';
import { useAuth } from '../hooks/useAuth';
import VideoCard from './VideoCard';

export default function FavoritesPage({ onSelectVideo, onToggleFavorite, isVideoFavorited }) {
    const { currentUser } = useAuth();

    const favorites = currentUser?.favorites || [];

    if (!currentUser) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10 text-center text-gray-600">
                Bạn cần đăng nhập để xem danh sách yêu thích.
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10 text-center text-gray-600">
                Chưa có video yêu thích nào.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Video yêu thích</h1>

            <div className="video-grid">
                {favorites.map((video) => (
                    <VideoCard
                        key={video.id || video.videoId}
                        video={video}
                        onSelect={onSelectVideo}
                        onToggleFavorite={onToggleFavorite}
                        isFavorited={isVideoFavorited?.(video)}
                    />
                ))}
            </div>
        </div>
    );
}