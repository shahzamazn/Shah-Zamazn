import React from 'react';
import { X, Play, Trash2, Bookmark, Film } from 'lucide-react';
import { MediaItem } from '../types/entertainment';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistItems: MediaItem[];
  onPlay: (item: MediaItem) => void;
  onRemove: (id: string) => void;
  lang: 'en' | 'ur';
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  watchlistItems,
  onPlay,
  onRemove,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              {lang === 'ur' ? 'میری واچ لسٹ' : 'My Shahzaman Watchlist'}
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              ({watchlistItems.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="p-6 overflow-y-auto space-y-3">
          {watchlistItems.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center">
              <Film className="w-12 h-12 text-slate-600 mb-3 stroke-[1.5]" />
              <p className="text-sm font-semibold text-slate-300 mb-1">
                {lang === 'ur' ? 'آپ کی واچ لسٹ خالی ہے' : 'Your Watchlist is empty'}
              </p>
              <p className="text-xs text-slate-500 max-w-xs">
                {lang === 'ur'
                  ? 'ڈراموں اور فلموں پر بک مارک آئیکن دبا کر محفوظ کریں۔'
                  : 'Click the bookmark icon on any drama or movie to save it for later.'}
              </p>
            </div>
          ) : (
            watchlistItems.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                    <img
                      src={item.posterImage}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                      {lang === 'ur' ? item.urduTitle : item.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      {item.network} · {item.releaseYear} · {lang === 'ur' ? item.urduDurationOrEpisodes : item.durationOrEpisodes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onPlay(item);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{lang === 'ur' ? 'چلائیں' : 'Play'}</span>
                  </button>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Remove from Watchlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
