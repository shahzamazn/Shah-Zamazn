export type MediaType = 'all' | 'drama' | 'movie';

export type NetworkChannel = 
  | 'all'
  | 'ARY Digital' 
  | 'Hum TV' 
  | 'Geo Entertainment' 
  | 'Green Entertainment' 
  | 'Pakistani Cinema';

export interface CastMember {
  name: string;
  urduName: string;
  role: string;
  avatar?: string;
}

export interface EpisodeItem {
  episodeNumber: number;
  title: string;
  urduTitle: string;
  airDate: string;
  duration: string;
  youtubeId: string;
  summary: string;
}

export interface MediaItem {
  id: string;
  title: string;
  urduTitle: string;
  type: 'drama' | 'movie';
  releaseYear: number;
  network: string;
  rating: number; // e.g. 9.5
  totalReviews: number;
  durationOrEpisodes: string;
  urduDurationOrEpisodes: string;
  genres: string[];
  director: string;
  writer: string;
  cast: CastMember[];
  synopsis: string;
  urduSynopsis: string;
  posterImage: string;
  backdropImage: string;
  trailerYoutubeId: string;
  episodes: EpisodeItem[];
  ost?: {
    title: string;
    urduTitle: string;
    singers: string;
    youtubeId: string;
  };
  featured?: boolean;
  trendingRank?: number;
  isNew?: boolean;
}
