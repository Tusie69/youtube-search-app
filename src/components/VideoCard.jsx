import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function VideoCard({
                                      video,
                                      isFavorited = false,
                                      onToggleFavorite,
                                      onSelect
                                  }) {
    const { currentUser } = useAuth();

    if (!video) return null;

    const snippet = video.snippet || {};
    const thumbnail =
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.default?.url ||
        '';
    const title = snippet.title || 'Untitled video';
    const channelTitle = snippet.channelTitle || '';
    const publishedAt = snippet.publishedAt
        ? new Date(snippet.publishedAt).toLocaleDateString()
        : '';

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (!currentUser || !onToggleFavorite) return;
        onToggleFavorite(video);
    };

    return (
        <article className="video-card" onClick={() => onSelect?.(video)}>
            <div className="video-thumb">
                {thumbnail ? (
                    <img src={thumbnail} alt={title} />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-500">
                        No thumbnail
                    </div>
                )}
            </div>

            <div className="video-info">
                <h3 className="video-title">{title}</h3>
                <p className="video-channel">{channelTitle}</p>

                <div className="mt-2 flex items-center justify-between gap-2">
                    {publishedAt ? (
                        <p className="video-date">{publishedAt}</p>
                    ) : (
                        <span />
                    )}

                    <button
                        type="button"
                        onClick={handleFavoriteClick}
                        disabled={!currentUser}
                        title={
                            currentUser
                                ? isFavorited
                                    ? 'Bỏ khỏi yêu thích'
                                    : 'Thêm vào yêu thích'
                                : 'Đăng nhập để lưu yêu thích'
                        }
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${
                            isFavorited
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : currentUser
                                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    : 'cursor-not-allowed bg-gray-100 text-gray-400'
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteClick(e);
                        }}
                    >
                        <Heart size={15} className={isFavorited ? 'fill-current' : ''} />
                        {isFavorited ? 'Đã thích' : currentUser ? 'Yêu thích' : 'Đăng nhập'}
                    </button>
                </div>
            </div>
        </article>
    );
}