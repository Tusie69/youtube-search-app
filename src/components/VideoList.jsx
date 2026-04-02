import React from 'react';
import VideoCard from './VideoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VideoList = ({
                       videos,
                       onVideoSelect,
                       onPageChange,
                       hasNextPage,
                       hasPrevPage,
                       onToggleFavorite,
                       isVideoFavorited
                   }) => {
    return (
        <div className="content-wrap">
            <div className="video-grid">
                {videos.map((video) => (
                    <VideoCard
                        key={video.id?.videoId || video.id}
                        video={video}
                        onSelect={onVideoSelect}
                        onToggleFavorite={onToggleFavorite}
                        isFavorited={isVideoFavorited?.(video)}
                    />
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => onPageChange('prev')} disabled={!hasPrevPage}>
                    <ChevronLeft size={20} /> Trước
                </button>
                <button onClick={() => onPageChange('next')} disabled={!hasNextPage}>
                    Sau <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default VideoList;