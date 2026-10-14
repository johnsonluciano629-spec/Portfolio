export interface ClubExperience {
  id: string;
  name: string;
  shortName?: string;
  years: string;
  position: string;
  tierOrLeague: string;
  highlights: string[];
  crestColor: string;
  accentColor: string;
  isConfirmed: boolean;
  notes?: string;
}

export interface PlayerProfileData {
  fullName: string;
  email: string;
  profession: string;
  headline: string;
  heroIntro: string;
  bioParagraphs: string[];
  
  // Confirmed & editable fields
  position: string;
  secondaryPosition: string;
  nationality: string;
  dateOfBirth?: string;
  height: string;
  preferredFoot: string;
  currentClub: string;
  squadNumber: string;
  
  // Tactical & Performance Strengths
  strengths: string[];
  
  // Achievements
  achievements: {
    id: string;
    title: string;
    organization: string;
    year: string;
    description: string;
    isConfirmed: boolean;
  }[];
  
  // Media Assets
  heroPortrait: string;
  stadiumBg: string;
  
  // Clubs
  clubs: ClubExperience[];
  
  // Video Highlights
  highlightVideos: {
    id: string;
    title: string;
    category: string;
    duration: string;
    youtubeId?: string;
    thumbnailUrl: string;
    description: string;
  }[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'match' | 'training' | 'action' | 'portrait' | 'club';
  imageUrl: string;
  caption: string;
  dateTag?: string;
}
