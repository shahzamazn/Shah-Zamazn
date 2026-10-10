import React, { useState, useMemo } from 'react';
import { 
  Film, 
  Tv, 
  Sparkles, 
  Search, 
  Filter, 
  Star, 
  Flame, 
  Bookmark, 
  Music, 
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { MEDIA_CATALOG, GENRE_LIST, NETWORKS_LIST } from './data/mediaCatalog';
import { MediaItem, MediaType } from './types/entertainment';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MediaCard } from './components/MediaCard';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { MediaDetailsModal } from './components/MediaDetailsModal';
import { WatchlistModal } from './components/WatchlistModal';
import { OstSection } from './components/OstSection';
import { PlayStorePublishModal } from './components/PlayStorePublishModal';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [currentTab, setCurrentTab] = useState<MediaType | 'ost' | 'watchlist'>('all');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('All Genres');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'popular'>('rating');

  // Active modals
  const [playingMedia, setPlayingMedia] = useState<{ item: MediaItem; episodeNumber?: number } | null>(null);
  const [detailsMedia, setDetailsMedia] = useState<MediaItem | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isPlayStoreOpen, setIsPlayStoreOpen] = useState(false);

  // Hero selected item
  const [heroItem, setHeroItem] = useState<MediaItem>(MEDIA_CATALOG[0]); // Kabhi Main Kabhi Tum

  // Watchlist stored in localStorage
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shahzaman_watchlist');
      return saved ? JSON.parse(saved) : ['kabhi-main-kabhi-tum', 'legend-of-maula-jatt', 'ishq-murshid'];
    } catch {
      return ['kabhi-main-kabhi-tum', 'legend-of-maula-jatt', 'ishq-murshid'];
    }
  });

  const toggleWatchlist = (id: string) => {
    setWatchlistIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('shahzaman_watchlist', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const handleOpenPlay = (item: MediaItem, episodeNumber?: number) => {
    setPlayingMedia({ item, episodeNumber });
  };

  // Filtered Media list
  const filteredMedia = useMemo(() => {
    return MEDIA_CATALOG.filter(item => {
      // Tab filter
      if (currentTab === 'drama' && item.type !== 'drama') return false;
      if (currentTab === 'movie' && item.type !== 'movie') return false;
      if (currentTab === 'watchlist' && !watchlistIds.includes(item.id)) return false;

      // Network filter
      if (selectedNetwork !== 'all' && item.network !== selectedNetwork) return false;

      // Genre filter
      if (selectedGenre !== 'All Genres' && !item.genres.includes(selectedGenre)) return false;

      // Search query filter (matches English title, Urdu title, cast, director)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query) || item.urduTitle.includes(query);
        const matchesCast = item.cast.some(c => c.name.toLowerCase().includes(query) || c.urduName.includes(query));
        const matchesDirector = item.director.toLowerCase().includes(query);
        const matchesSynopsis = item.synopsis.toLowerCase().includes(query) || item.urduSynopsis.includes(query);
        if (!matchesTitle && !matchesCast && !matchesDirector && !matchesSynopsis) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.releaseYear - a.releaseYear;
      return b.totalReviews - a.totalReviews;
    });
  }, [currentTab, selectedNetwork, selectedGenre, searchQuery, sortBy, watchlistIds]);

  const trendingDramas = useMemo(() => {
    return MEDIA_CATALOG.filter(m => m.type === 'drama').slice(0, 4);
  }, []);

  const blockbusterMovies = useMemo(() => {
    return MEDIA_CATALOG.filter(m => m.type === 'movie').slice(0, 4);
  }, []);

  const featuredList = useMemo(() => {
    return MEDIA_CATALOG.filter(m => m.featured);
  }, []);

  const watchlistItems = useMemo(() => {
    return MEDIA_CATALOG.filter(m => watchlistIds.includes(m.id));
  }, [watchlistIds]);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'watchlist') {
            setIsWatchlistOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        lang={lang}
        onToggleLang={() => setLang(lang === 'ur' ? 'en' : 'ur')}
        watchlistCount={watchlistIds.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onOpenPlayStore={() => setIsPlayStoreOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full py-6 sm:py-8">
        
        {/* If user is on OST tab, show OST section prominently */}
        {currentTab === 'ost' ? (
          <div className="pt-2">
            <OstSection
              items={MEDIA_CATALOG}
              onPlayOst={(item) => handleOpenPlay(item)}
              lang={lang}
            />
          </div>
        ) : (
          <>
            {/* Hero Banner Showcase (Only when not searching) */}
            {!searchQuery && (
              <HeroBanner
                item={heroItem}
                onPlay={(item) => handleOpenPlay(item)}
                onOpenDetails={(item) => setDetailsMedia(item)}
                isWatchlisted={watchlistIds.includes(heroItem.id)}
                onToggleWatchlist={toggleWatchlist}
                lang={lang}
                featuredList={featuredList}
                onSelectHeroItem={(item) => setHeroItem(item)}
              />
            )}

            {/* Filter & Controls Toolbar */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Media Type Tabs (Buttons with click handlers) */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-x-auto">
                  <button
                    onClick={() => setCurrentTab('all')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      currentTab === 'all'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'ur' ? 'تمام شوز' : 'All Titles'}
                  </button>

                  <button
                    onClick={() => setCurrentTab('drama')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      currentTab === 'drama'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'ur' ? 'نئے ڈرامے' : 'Dramas Only'}
                  </button>

                  <button
                    onClick={() => setCurrentTab('movie')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      currentTab === 'movie'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'ur' ? 'پاکستانی فلمیں' : 'Movies Only'}
                  </button>
                </div>

                {/* Network & Genre & Sorting Selectors */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Network Filter */}
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                  >
                    {NETWORKS_LIST.map(net => (
                      <option key={net.id} value={net.id}>
                        {lang === 'ur' ? net.urduName : net.name}
                      </option>
                    ))}
                  </select>

                  {/* Genre Filter */}
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                  >
                    {GENRE_LIST.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>

                  {/* Sort Order */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                  >
                    <option value="rating">{lang === 'ur' ? 'بہترین ریٹنگ' : 'Highest Rated'}</option>
                    <option value="year">{lang === 'ur' ? 'تازہ ترین ریلیز' : 'Newest Release'}</option>
                    <option value="popular">{lang === 'ur' ? 'سب سے زیادہ مقبول' : 'Most Popular'}</option>
                  </select>

                  {/* Reset Filters button if any active */}
                  {(selectedNetwork !== 'all' || selectedGenre !== 'All Genres' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedNetwork('all');
                        setSelectedGenre('All Genres');
                        setSearchQuery('');
                      }}
                      className="px-2.5 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{lang === 'ur' ? 'فلٹر ختم کریں' : 'Clear'}</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Search Active Notification if applicable */}
              {searchQuery && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {lang === 'ur' ? 'تلاش کے نتائج برائے:' : 'Search results for:'} <strong className="text-white">&quot;{searchQuery}&quot;</strong> ({filteredMedia.length} {lang === 'ur' ? 'نتائج' : 'found'})
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-amber-400 hover:underline cursor-pointer"
                  >
                    {lang === 'ur' ? 'تمام عنوانات دکھائیں' : 'Show all'}
                  </button>
                </div>
              )}
            </div>

            {/* If searching or filters applied, show Filtered Grid */}
            {(searchQuery || selectedNetwork !== 'all' || selectedGenre !== 'All Genres' || currentTab !== 'all') ? (
              <section className="mb-14">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {lang === 'ur' ? 'منتخب شدہ عنوانات' : 'Selected Catalog'}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {filteredMedia.length} {lang === 'ur' ? 'عنوانات دستیاب ہیں' : 'titles'}
                  </span>
                </div>

                {filteredMedia.length === 0 ? (
                  <div className="py-16 text-center bg-slate-900/30 rounded-2xl border border-slate-800">
                    <p className="text-sm font-semibold text-slate-300 mb-1">
                      {lang === 'ur' ? 'کوئی ڈراما یا فلم نہیں ملی' : 'No titles matched your criteria'}
                    </p>
                    <p className="text-xs text-slate-500 mb-4">
                      {lang === 'ur' ? 'براہ کرم تلاش کے الفاظ یا فلٹر تبدیل کریں۔' : 'Try searching for Fahad Mustafa, Wahaj Ali, Maula Jatt, or change filters.'}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedNetwork('all');
                        setSelectedGenre('All Genres');
                        setSearchQuery('');
                        setCurrentTab('all');
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      {lang === 'ur' ? 'تمام فہرست دیکھیں' : 'Reset All Filters'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredMedia.map(item => (
                      <MediaCard
                        key={item.id}
                        item={item}
                        onPlay={(it) => handleOpenPlay(it)}
                        onOpenDetails={(it) => setDetailsMedia(it)}
                        isWatchlisted={watchlistIds.includes(item.id)}
                        onToggleWatchlist={toggleWatchlist}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </section>
            ) : (
              /* Default Homepage Curated Rows */
              <>
                {/* Row 1: Trending Pakistani Dramas */}
                <section className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-0.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lang === 'ur' ? 'سب سے زیادہ دیکھے جانے والے ڈرامے' : 'HOT & TRENDING NOW'}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {lang === 'ur' ? 'ٹرینڈنگ پاکستانی ڈرامے' : 'Trending Pakistani Dramas'}
                      </h2>
                    </div>

                    <button
                      onClick={() => setCurrentTab('drama')}
                      className="text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'ur' ? 'مزید ڈرامے دیکھیں' : 'Explore All Dramas'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {trendingDramas.map(item => (
                      <MediaCard
                        key={item.id}
                        item={item}
                        onPlay={(it) => handleOpenPlay(it)}
                        onOpenDetails={(it) => setDetailsMedia(it)}
                        isWatchlisted={watchlistIds.includes(item.id)}
                        onToggleWatchlist={toggleWatchlist}
                        lang={lang}
                      />
                    ))}
                  </div>
                </section>

                {/* Row 2: Blockbuster Pakistani Cinema */}
                <section className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-0.5">
                        <Film className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lang === 'ur' ? 'بڑے پردے کے شاہکار' : 'CINEMATIC BLOCKBUSTERS'}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {lang === 'ur' ? 'پاکستانی سپر ہٹ فلمیں' : 'Pakistani Blockbuster Movies'}
                      </h2>
                    </div>

                    <button
                      onClick={() => setCurrentTab('movie')}
                      className="text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'ur' ? 'تمام فلمیں دیکھیں' : 'Explore All Movies'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {blockbusterMovies.map(item => (
                      <MediaCard
                        key={item.id}
                        item={item}
                        onPlay={(it) => handleOpenPlay(it)}
                        onOpenDetails={(it) => setDetailsMedia(it)}
                        isWatchlisted={watchlistIds.includes(item.id)}
                        onToggleWatchlist={toggleWatchlist}
                        lang={lang}
                      />
                    ))}
                  </div>
                </section>

                {/* Row 3: OST Soundtracks Spotlight */}
                <OstSection
                  items={MEDIA_CATALOG}
                  onPlayOst={(item) => handleOpenPlay(item)}
                  lang={lang}
                />

                {/* Row 4: All Catalog Grid */}
                <section className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-0.5">
                        <Tv className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lang === 'ur' ? 'مکمل کیٹلاگ' : 'FULL ARCHIVE'}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {lang === 'ur' ? 'شاہ زمان پر تمام شوز' : 'Complete Pakistani Entertainment Collection'}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {MEDIA_CATALOG.slice(4).map(item => (
                      <MediaCard
                        key={item.id}
                        item={item}
                        onPlay={(it) => handleOpenPlay(it)}
                        onOpenDetails={(it) => setDetailsMedia(it)}
                        isWatchlisted={watchlistIds.includes(item.id)}
                        onToggleWatchlist={toggleWatchlist}
                        lang={lang}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </>
        )}

      </main>

      {/* Quiet Footer (anti-slop, no fake engines) */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 text-sm">Shahzaman</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'ur' ? 'پاکستانی نئے ڈرامے اور فلمیں' : 'Pakistani Cinema & Dramas Portal'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span>ARY Digital</span>
            <span>Hum TV</span>
            <span>Geo Entertainment</span>
            <span>Green Entertainment</span>
          </div>

          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Shahzaman. Crafted for Pakistani entertainment lovers.
          </p>
        </div>
      </footer>

      {/* Video Player Modal */}
      {playingMedia && (
        <VideoPlayerModal
          item={playingMedia.item}
          initialEpisodeNumber={playingMedia.episodeNumber}
          isOpen={Boolean(playingMedia)}
          onClose={() => setPlayingMedia(null)}
          isWatchlisted={watchlistIds.includes(playingMedia.item.id)}
          onToggleWatchlist={toggleWatchlist}
          lang={lang}
        />
      )}

      {/* Media Details Modal */}
      {detailsMedia && (
        <MediaDetailsModal
          item={detailsMedia}
          isOpen={Boolean(detailsMedia)}
          onClose={() => setDetailsMedia(null)}
          onPlay={(item, epNum) => handleOpenPlay(item, epNum)}
          isWatchlisted={watchlistIds.includes(detailsMedia.id)}
          onToggleWatchlist={toggleWatchlist}
          lang={lang}
        />
      )}

      {/* Watchlist Modal */}
      <WatchlistModal
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistItems={watchlistItems}
        onPlay={(item) => handleOpenPlay(item)}
        onRemove={toggleWatchlist}
        lang={lang}
      />

      {/* Play Store & Mobile Publishing Modal */}
      <PlayStorePublishModal
        isOpen={isPlayStoreOpen}
        onClose={() => setIsPlayStoreOpen(false)}
        lang={lang}
      />

    </div>
  );
}
