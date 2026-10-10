import React from 'react';
import { Music, Play, Volume2, Sparkles } from 'lucide-react';
import { MediaItem } from '../types/entertainment';

interface OstSectionProps {
  items: MediaItem[];
  onPlayOst: (item: MediaItem) => void;
  lang: 'en' | 'ur';
}

export const OstSection: React.FC<OstSectionProps> = ({
  items,
  onPlayOst,
  lang
}) => {
  const ostItems = items.filter(item => item.ost);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
            <Music className="w-4 h-4" />
            <span>{lang === 'ur' ? 'پاکستانی ڈراموں کے مشہور ٹائٹل گانے' : 'HIT ORIGINAL SOUNDTRACKS (OST)'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {lang === 'ur' ? 'سپر ہٹ او ایس ٹی پلیئر' : 'Iconic Drama & Film OSTs'}
          </h2>
        </div>
        <span className="text-xs text-slate-400">
          {ostItems.length} {lang === 'ur' ? 'گانے' : 'tracks'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {ostItems.map(item => {
          if (!item.ost) return null;
          return (
            <div
              key={item.id}
              onClick={() => onPlayOst(item)}
              className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition-all flex items-center justify-between gap-3 group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {lang === 'ur' ? item.ost.urduTitle : item.ost.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">
                    {item.ost.singers}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    From: {lang === 'ur' ? item.urduTitle : item.title} ({item.network})
                  </p>
                </div>
              </div>

              <div className="shrink-0 p-2 text-slate-500 group-hover:text-amber-400 transition-colors">
                <Volume2 className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
