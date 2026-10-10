import React from 'react';
import { Play, Info, Bookmark, Star } from 'lucide-react';
import { MediaItem } from '../types/entertainment';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
  onOpenDetails: (item: MediaItem) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (id: string) => void;
  lang: 'en' | 'ur';
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  onPlay,
  onOpenDetails,
  isWatchlisted,
  onToggleWatchlist,
  lang
}) => {
  return (
    <div className="group flex flex-col bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300">
      
      {/* Poster Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={item.posterImage}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button
            onClick={() => onPlay(item)}
            className="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-90 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 transition-transform cursor-pointer"
            aria-label={`Play ${item.title}`}
          >
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          </button>
          
          <button
            onClick={() => onOpenDetails(item)}
            className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-700 active:scale-90 text-slate-200 flex items-center justify-center border border-slate-600 transition-transform cursor-pointer"
            aria-label={`Details for ${item.title}`}
          >
            <Info className="w-4 h-4 text-slate-200" />
          </button>
        </div>

        {/* Top Floating Watchlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(item.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isWatchlisted
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900/80'
          }`}
          aria-label="Toggle Watchlist"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-slate-950' : ''}`} />
        </button>

        {/* Top Left Ranking / New indicator if applicable */}
        {item.isNew && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-red-600 text-white uppercase shadow-md">
            {lang === 'ur' ? 'نیا' : 'NEW'}
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata Line (Zero-Pill discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-1">
            <span className="text-amber-400/90 font-semibold">{item.network}</span>
            <span aria-hidden="true">·</span>
            <span>{item.releaseYear}</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'ur' ? item.urduDurationOrEpisodes : item.durationOrEpisodes}</span>
          </div>

          {/* Primary Title */}
          <h3 
            onClick={() => onOpenDetails(item)}
            className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {lang === 'ur' ? item.urduTitle : item.title}
          </h3>

          {/* Secondary Title */}
          <p className="text-xs text-slate-400 line-clamp-1 mb-2">
            {lang === 'ur' ? item.title : item.urduTitle}
          </p>
        </div>

        {/* Bottom Rating and Quick Watch Link */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{item.rating}</span>
            <span className="text-[10px] text-slate-500 font-normal">
              ({(item.totalReviews / 1000).toFixed(1)}k)
            </span>
          </div>

          <button
            onClick={() => onPlay(item)}
            className="text-[11px] font-semibold text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{lang === 'ur' ? 'دیکھیں' : 'Watch'}</span>
            <Play className="w-3 h-3 fill-current" />
          </button>
        </div>
      </div>

    </div>
  );
};
