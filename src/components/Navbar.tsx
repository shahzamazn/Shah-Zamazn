import React from 'react';
import { Film, Bookmark, Globe, Search, Sparkles } from 'lucide-react';
import { MediaType } from '../types/entertainment';

interface NavbarProps {
  currentTab: MediaType | 'ost' | 'watchlist';
  onSelectTab: (tab: MediaType | 'ost' | 'watchlist') => void;
  lang: 'en' | 'ur';
  onToggleLang: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  onOpenPlayStore: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang,
  watchlistCount,
  onOpenWatchlist,
  onOpenPlayStore,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onSelectTab('all')}
            className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md cursor-pointer"
            aria-label="Shahzaman Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-amber-950/30">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Shahzaman
              </span>
              <span className={`text-[10px] text-amber-400/90 font-medium tracking-wider uppercase ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {lang === 'ur' ? 'پاکستانی فلمیں و ڈرامے' : 'Pakistani Cinema & Dramas'}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('all')}
            className={`whitespace-nowrap transition-colors hover:text-white cursor-pointer ${
              currentTab === 'all' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            {lang === 'ur' ? 'تمام عنوانات' : 'All Titles'}
          </button>

          <button
            onClick={() => onSelectTab('drama')}
            className={`whitespace-nowrap transition-colors hover:text-white cursor-pointer ${
              currentTab === 'drama' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            {lang === 'ur' ? 'نئے ڈرامے' : 'New Dramas'}
          </button>

          <button
            onClick={() => onSelectTab('movie')}
            className={`whitespace-nowrap transition-colors hover:text-white cursor-pointer ${
              currentTab === 'movie' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            {lang === 'ur' ? 'پاکستانی فلمیں' : 'Pakistani Movies'}
          </button>

          <button
            onClick={() => onSelectTab('ost')}
            className={`whitespace-nowrap transition-colors hover:text-white cursor-pointer ${
              currentTab === 'ost' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            {lang === 'ur' ? 'ٹائٹل گانے (OST)' : 'Drama OSTs'}
          </button>
        </nav>

        {/* Search Input on Desktop */}
        <div className="hidden sm:flex items-center flex-1 max-w-xs relative mx-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={lang === 'ur' ? 'ڈراما، فلم یا اداکار تلاش کریں...' : 'Search dramas, movies, cast...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 transition-colors"
          />
        </div>

        {/* Zone 3: Actions (Play Store button + Language toggle + Watchlist) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenPlayStore}
            className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-950"
            title="Google Play Store & Mobile Install"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>{lang === 'ur' ? 'پلے اسٹور / انسٹال' : 'Play Store'}</span>
          </button>

          <button
            onClick={onToggleLang}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            title={lang === 'ur' ? 'Switch to English' : 'اردو میں تبدیل کریں'}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ur' ? 'English' : 'اردو'}</span>
          </button>

          <button
            onClick={onOpenWatchlist}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1.5 relative cursor-pointer"
            aria-label="View Watchlist"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{lang === 'ur' ? 'واچ لسٹ' : 'Watchlist'}</span>
            {watchlistCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] bg-amber-500 text-slate-950 font-bold rounded-full">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile search bar if on small screen */}
      <div className="sm:hidden px-4 pb-2.5 pt-1">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={lang === 'ur' ? 'ڈراما، فلم یا اداکار تلاش کریں...' : 'Search Pakistani titles...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>
    </header>
  );
};
