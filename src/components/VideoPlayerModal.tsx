import React, { useState, useEffect } from 'react';
import { X, Play, Share2, Bookmark, Check, Music, Sparkles, ExternalLink } from 'lucide-react';
import { MediaItem, EpisodeItem } from '../types/entertainment';

interface VideoPlayerModalProps {
  item: MediaItem;
  initialEpisodeNumber?: number;
  isOpen: boolean;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (id: string) => void;
  lang: 'en' | 'ur';
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  item,
  initialEpisodeNumber,
  isOpen,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
  lang
}) => {
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeItem | null>(null);
  const [isPlayingOst, setIsPlayingOst] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    if (initialEpisodeNumber && item.episodes.length > 0) {
      const ep = item.episodes.find(e => e.episodeNumber === initialEpisodeNumber);
      setSelectedEpisode(ep || item.episodes[0]);
    } else if (item.episodes.length > 0) {
      setSelectedEpisode(item.episodes[0]);
    }
    setIsPlayingOst(false);
  }, [item, initialEpisodeNumber]);

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

  const currentYoutubeId = isPlayingOst
    ? (item.ost?.youtubeId || item.trailerYoutubeId)
    : (selectedEpisode?.youtubeId || item.trailerYoutubeId);

  const handleCopyShare = () => {
    const shareText = `Check out "${item.title}" on Shahzaman - Pakistani Entertainment Hub!`;
    navigator.clipboard?.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
              {lang === 'ur' ? 'شاہ زمان پلیئر' : 'SHAHZAMAN THEATRE'}
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {lang === 'ur' ? item.urduTitle : item.title}
              {selectedEpisode && !isPlayingOst && (
                <span className="text-slate-400 font-normal ml-2 text-xs">
                  ({lang === 'ur' ? selectedEpisode.urduTitle : selectedEpisode.title})
                </span>
              )}
              {isPlayingOst && (
                <span className="text-amber-400 font-normal ml-2 text-xs">
                  (Official OST)
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShare}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Share Link"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onToggleWatchlist(item.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
              title="Toggle Watchlist"
            >
              <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-950 hover:text-rose-400 text-slate-300 transition-colors cursor-pointer"
              aria-label="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={item.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Player Body & Episode Explorer */}
        <div className="p-5 overflow-y-auto flex-1 bg-slate-900/90">
          
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
            
            {/* Left: Summary and Metadata */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="text-amber-400 font-semibold">{item.network}</span>
                <span>·</span>
                <span>{item.releaseYear}</span>
                <span>·</span>
                <span>{item.genres.join(', ')}</span>
                <span>·</span>
                <span>Director: {item.director}</span>
              </div>

              <p className={`text-slate-300 text-sm leading-relaxed mb-4 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {isPlayingOst 
                  ? `Official Soundtrack: ${item.ost?.title} sung by ${item.ost?.singers}` 
                  : (selectedEpisode?.summary || (lang === 'ur' ? item.urduSynopsis : item.synopsis))}
              </p>

              {/* OST Quick button if available */}
              {item.ost && (
                <button
                  onClick={() => setIsPlayingOst(!isPlayingOst)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isPlayingOst
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>
                    {isPlayingOst 
                      ? (lang === 'ur' ? 'ڈراما ویڈیو پر واپس جائیں' : 'Return to Episode Video')
                      : (lang === 'ur' ? `او ایس ٹی گانا سنیں: ${item.ost.urduTitle}` : `Listen to OST: ${item.ost.title}`)}
                  </span>
                </button>
              )}
            </div>

            {/* Right: Episode Picker for Series */}
            {item.episodes.length > 0 && (
              <div className="w-full lg:w-72 bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  {lang === 'ur' ? 'اقساط اور کلپس:' : 'Episodes & Features:'}
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {item.episodes.map(ep => {
                    const isCurrent = !isPlayingOst && selectedEpisode?.episodeNumber === ep.episodeNumber;
                    return (
                      <button
                        key={ep.episodeNumber}
                        onClick={() => {
                          setSelectedEpisode(ep);
                          setIsPlayingOst(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold'
                            : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 line-clamp-1">
                          <Play className={`w-3 h-3 ${isCurrent ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
                          <span className="line-clamp-1">{lang === 'ur' ? ep.urduTitle : ep.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2 font-mono">
                          {ep.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
