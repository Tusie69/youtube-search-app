import React from 'react';
import { X, Heart, HeartOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const VideoModal = ({ video, onClose, onToggleFavorite, isFavorited = false }) => {
    const { currentUser } = useAuth();

    if (!video) return null;

    const videoId = video?.id?.videoId || video?.id;
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    const handleFavoriteClick = () => {
        if (!currentUser || !onToggleFavorite) return;
        onToggleFavorite(video);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-panel" style={{ position: 'relative' }}>
                <button onClick={onClose} className="modal-close">
                    <X size={24} />
                </button>

                <div className="aspect-video">
                    <iframe
                        src={videoSrc}
                        title={video.snippet.title}
                        className="h-full w-full"
                        allowFullScreen
                        allow="autoplay"
                    />
                </div>

                <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                            <h2 className="mb-2 text-xl font-bold">{video.snippet.title}</h2>
                            <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
                        </div>

                        {currentUser && (
                            <button
                                onClick={handleFavoriteClick}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                                    isFavorited
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                            >
                                {isFavorited ? (
                                    <Heart size={16} className="fill-current" />
                                ) : (
                                    <HeartOff size={16} />
                                )}
                                {isFavorited ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
                            </button>
                        )}
                    </div>

                    <p className="line-clamp-3 text-gray-700">{video.snippet.description}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;