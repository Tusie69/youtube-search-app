import React from 'react';

const VideoCard = ({ video, onVideoSelect }) => {
    const { snippet } = video;

    return (
        <div onClick={() => onVideoSelect(video)} className="video-card">
            <div className="video-thumb">
                <img
                    src={snippet.thumbnails.medium.url}
                    alt={snippet.title}
                />
            </div>

            <div className="video-info">
                <h3 className="video-title">{snippet.title}</h3>
                <p className="video-channel">{snippet.channelTitle}</p>
                <p className="video-date">
                    {new Date(snippet.publishedAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default VideoCard;