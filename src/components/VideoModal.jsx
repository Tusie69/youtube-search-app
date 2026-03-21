import React from 'react';
import { X } from 'lucide-react';

const VideoModal = ({ video, onClose }) => {
    if (!video) return null;

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`;

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
                        className="w-full h-full"
                        allowFullScreen
                        allow="autoplay"
                    />
                </div>

                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{video.snippet.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">{video.snippet.channelTitle}</p>
                    <p className="text-gray-700 line-clamp-3">{video.snippet.description}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;