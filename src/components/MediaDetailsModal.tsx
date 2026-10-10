import React, { useState, useEffect } from 'react';
import { X, Play, Bookmark, Star, Calendar, Clock, Tv, Film, User, Check, Music } from 'lucide-react';
import { MediaItem } from '../types/entertainment';

interface MediaDetailsModalProps {
  item: MediaItem;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (item: MediaItem, episodeNumber?: number) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (id: string) => void;
  lang: 'en' | 'ur';
}

export const MediaDetailsModal: React.FC<MediaDetailsModalProps> = ({
  item,
  isOpen,
  onClose,
  onPlay,
  isWatchlisted,
  onToggleWatchlist,
  lang
}) => {
  const [userRating, setUserRating] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`shahzaman_rating_${item.id}`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [hoverRating, setHoverRating] = useState<number>(0);
  const [ratingSavedToast, setRatingSavedToast] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`shahzaman_rating_${item.id}`);
      setUserRating(saved ? parseInt(saved, 10) : 0);
    } catch {
      setUserRating(0);
    }
  }, [item.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRate = (stars: number) => {
    setUserRating(stars);
    try {
      localStorage.setItem(`shahzaman_rating_${item.id}`, stars.toString());
    } catch (e) {
      // ignore
    }
    setRatingSavedToast(true);
    setTimeout(() => setRatingSavedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[90vh]">
        
        {/* Backdrop Visual Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={item.backdropImage}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />

          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-slate-200 transition-colors cursor-pointer border border-slate-700/60 z-20"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Bottom info on header */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                <span>{item.network}</span>
                <span>·</span>
                <span>{item.type === 'drama' ? (lang === 'ur' ? 'ڈراما سیریل' : 'Drama') : (lang === 'ur' ? 'پاکستانی فلم' : 'Cinema')}</span>
                <span>·</span>
                <span>{item.releaseYear}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {lang === 'ur' ? item.urduTitle : item.title}
              </h2>
              <p className="text-sm text-slate-300">
                {lang === 'ur' ? item.title : item.urduTitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onPlay(item);
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{lang === 'ur' ? 'ابھی دیکھیں' : 'Watch Now'}</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(item.id)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isWatchlisted
                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                    : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                }`}
                title="Toggle Watchlist"
              >
                <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Metadata Bar & Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{lang === 'ur' ? item.urduDurationOrEpisodes : item.durationOrEpisodes}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{item.genres.join(' / ')}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{item.rating} / 10</span>
                <span className="text-slate-400 font-normal">({item.totalReviews.toLocaleString()} votes)</span>
              </span>
            </div>

            {/* Interactive User Star Rating */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">
                {lang === 'ur' ? 'آپ کی ریٹنگ:' : 'Your Rating:'}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(starIndex => (
                  <button
                    key={starIndex}
                    onClick={() => handleRate(starIndex * 2)}
                    onMouseEnter={() => setHoverRating(starIndex * 2)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                    aria-label={`Rate ${starIndex * 2} out of 10`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        (hoverRating || userRating) >= starIndex * 2
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <span className="text-xs font-bold text-amber-400 ml-1">
                  {userRating}/10
                </span>
              )}
              {ratingSavedToast && (
                <span className="text-[11px] text-emerald-400 font-semibold animate-fade-in flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {lang === 'ur' ? 'کہانی اور خلاصہ' : 'Synopsis & Storyline'}
            </h4>
            <p className={`text-slate-200 text-sm leading-relaxed ${lang === 'ur' ? 'font-urdu' : ''}`}>
              {lang === 'ur' ? item.urduSynopsis : item.synopsis}
            </p>
          </div>

          {/* Cast & Crew Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {lang === 'ur' ? 'اہم ستارے اور کردار' : 'Key Cast & Characters'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {item.cast.map(c => (
                <div key={c.name} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col">
                  <span className="text-xs font-bold text-white line-clamp-1">
                    {lang === 'ur' ? c.urduName : c.name}
                  </span>
                  <span className="text-[11px] text-amber-400/90 font-medium line-clamp-1">
                    as {c.role}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/60">
              <div>
                <span className="text-slate-500 font-medium">Director: </span>
                <span className="text-slate-200 font-semibold">{item.director}</span>
              </div>
              <span aria-hidden="true">·</span>
              <div>
                <span className="text-slate-500 font-medium">Writer: </span>
                <span className="text-slate-200 font-semibold">{item.writer}</span>
              </div>
            </div>
          </div>

          {/* Official OST Song Card */}
          {item.ost && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">
                    {lang === 'ur' ? item.ost.urduTitle : item.ost.title}
                  </h5>
                  <p className="text-xs text-slate-400">
                    Singer: <span className="text-slate-200 font-medium">{item.ost.singers}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onPlay(item);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{lang === 'ur' ? 'گانا سنیں' : 'Listen OST Track'}</span>
              </button>
            </div>
          )}

          {/* Episode Guide / Chapters */}
          {item.episodes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'ur' ? 'اقساط کی فہرست' : 'Episode Guide & Specials'}
                </h4>
                <span className="text-xs text-slate-500">
                  {item.episodes.length} {lang === 'ur' ? 'اقساط دستیاب ہیں' : 'episodes listed'}
                </span>
              </div>

              <div className="space-y-2.5">
                {item.episodes.map(ep => (
                  <div
                    key={ep.episodeNumber}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                          {lang === 'ur' ? ep.urduTitle : ep.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          · {ep.duration} · {ep.airDate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                        {ep.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onPlay(item, ep.episodeNumber);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{lang === 'ur' ? 'قسط دیکھیں' : 'Play'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
