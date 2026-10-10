import React from 'react';
import { Play, Info, Bookmark, Star, Sparkles, Volume2 } from 'lucide-react';
import { MediaItem } from '../types/entertainment';

interface HeroBannerProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
  onOpenDetails: (item: MediaItem) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (id: string) => void;
  lang: 'en' | 'ur';
  featuredList: MediaItem[];
  onSelectHeroItem: (item: MediaItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  item,
  onPlay,
  onOpenDetails,
  isWatchlisted,
  onToggleWatchlist,
  lang,
  featuredList,
  onSelectHeroItem
}) => {
  return (
    <section className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-2xl mb-10 group">
      {/* Background visual asset with subtle scrim overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={item.backdropImage}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />
        {/* Measured Scrim Overlay for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl flex flex-col justify-end min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]">
        {/* Featured Editorial Tag & Unboxed Metadata */}
        <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-3 tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'ur' ? 'نمایاں انتخاب · شاہ زمان خصوصی' : 'FEATURED SPOTLIGHT · SHAHZAMAN PREMIERE'}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2 leading-tight">
          {lang === 'ur' ? item.urduTitle : item.title}
        </h1>

        {/* Secondary Title in alternate language */}
        <p className="text-sm sm:text-base text-slate-300 font-medium mb-3">
          {lang === 'ur' ? item.title : item.urduTitle}
        </p>

        {/* Unboxed Metadata (Zero-Pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300 mb-4">
          <span className="font-semibold text-white">
            {item.type === 'drama' 
              ? (lang === 'ur' ? 'ڈراما سیریل' : 'Drama Series') 
              : (lang === 'ur' ? 'پاکستانی فلم' : 'Feature Film')}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{item.network}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{item.releaseYear}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{lang === 'ur' ? item.urduDurationOrEpisodes : item.durationOrEpisodes}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{item.rating}</span>
          </span>
        </div>

        {/* Synopsis */}
        <p className={`text-slate-300 text-xs sm:text-sm lg:text-base line-clamp-3 leading-relaxed mb-6 max-w-2xl ${
          lang === 'ur' ? 'font-urdu' : ''
        }`}>
          {lang === 'ur' ? item.urduSynopsis : item.synopsis}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onPlay(item)}
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{lang === 'ur' ? 'ابھی دیکھیں (ٹریلر / اقساط)' : 'Watch Trailer & Episodes'}</span>
          </button>

          <button
            onClick={() => onToggleWatchlist(item.id)}
            className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
              isWatchlisted 
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isWatchlisted ? (lang === 'ur' ? 'محفوظ شدہ' : 'In Watchlist') : (lang === 'ur' ? 'واچ لسٹ میں شامل کریں' : 'Add to Watchlist')}</span>
          </button>

          <button
            onClick={() => onOpenDetails(item)}
            className="px-4 py-2.5 sm:px-5 sm:py-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4 text-slate-400" />
            <span>{lang === 'ur' ? 'تفصیلات اور کاسٹ' : 'Cast & Overview'}</span>
          </button>
        </div>

        {/* Carousel Switcher Pills */}
        <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-800/60">
          <span className="text-[11px] text-slate-400 mr-2 uppercase tracking-wider font-semibold">
            {lang === 'ur' ? 'دیگر ٹاپ شوز:' : 'Top Picks:'}
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {featuredList.map(featured => (
              <button
                key={featured.id}
                onClick={() => onSelectHeroItem(featured)}
                className={`px-3 py-1 text-xs rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  featured.id === item.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {lang === 'ur' ? featured.urduTitle : featured.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
