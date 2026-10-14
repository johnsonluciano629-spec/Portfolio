import { PlayerProfileData, GalleryPhoto } from '../types';

export const initialPlayerData: PlayerProfileData = {
  fullName: 'Luciano Johnson',
  email: 'johnsonluciano629@gmail.com',
  profession: 'Football Player',
  headline: 'LUCIANO JOHNSON — BUILT FOR THE GAME.',
  heroIntro:
    'Welcome to the official digital portfolio of Luciano Johnson, a dedicated footballer with experience across multiple football clubs. Explore my football journey, career experience, achievements, and player profile.',
  
  bioParagraphs: [
    'Luciano Johnson is a committed and athletic striker defined by relentless work ethic, clinical movement, and unwavering discipline on and off the pitch. Currently competing for ONE FC, with career experience spanning prominent football clubs—including Old Mutual FC, Cape Umoya FC, Clarewood FC, Antalyaspor FC, and Vasco FC—he brings high competitive hunger, attacking instinct, and a professional mindset to every training session and matchday.',
    'A firm believer in continuous athletic development, Luciano focuses on physical conditioning, technical refinement, and strategic execution in the final third. His approach to football centers on collective teamwork, accountability, and maintaining peak focus under competitive pressure, making him a reliable goal-scoring and attacking asset for coaching staffs and squad dynamics.',
    'Driven by an ambition to compete at the highest professional levels, Luciano remains dedicated to advancing his craft, adapting seamlessly to progressive tactical setups, and consistently contributing to team success and silverware.'
  ],

  // Player Profile technical details
  position: 'Striker',
  secondaryPosition: 'Center Forward / Attacking Forward',
  nationality: 'South African',
  height: '182 cm',
  preferredFoot: 'Left',
  currentClub: 'ONE FC',
  squadNumber: '28',

  strengths: [
    'Finishing & Composure',
    'Off-The-Ball Box Movement',
    'Pace & Acceleration',
    'High-Intensity Work Rate',
    'Hold-Up & Link Play',
    'Aerial & Athletic Presence'
  ],

  achievements: [
    {
      id: 'ach-1',
      title: 'Senior Squad Career Representation',
      organization: 'Multiple Clubs (Old Mutual, Cape Umoya, Clarewood, Antalyaspor, Vasco, ONE FC)',
      year: 'Confirmed',
      description: 'Competitive football experience across regional, national, and international football club setups.',
      isConfirmed: true
    },
    {
      id: 'ach-2',
      title: 'First Team Selection & Match Readiness',
      organization: 'ONE FC & Previous Clubs',
      year: 'Active',
      description: 'Demonstrated dedication to tactical drills, match preparation, and senior squad standards.',
      isConfirmed: true
    },
    {
      id: 'ach-3',
      title: '[Career Milestone / Tournament Honours]',
      organization: '[Click to edit club / cup name]',
      year: '[Year / Season]',
      description: '[Editable placeholder: Add championship medals, promotion runs, or top scorer/assist milestones.]',
      isConfirmed: false
    }
  ],

  heroPortrait: '', // Empty by default so user can immediately upload their own picture
  stadiumBg: '/src/assets/images/stadium_hero_bg_1791967424117.jpg',

  // Clubs including current club ONE FC and all 5 prior career clubs
  clubs: [
    {
      id: 'club-one-fc',
      name: 'ONE FC',
      shortName: 'OFC',
      years: 'Current / Present',
      position: 'Striker (#28)',
      tierOrLeague: 'Current Football Club',
      highlights: [
        'Active first team striker (#28) leading the front line',
        'Clinical box finishing and sharp off-the-ball movement',
        'High work rate, tactical pressing, and dynamic link-up play'
      ],
      crestColor: '#09090b',
      accentColor: '#facc15',
      isConfirmed: true,
      notes: 'Current Club'
    },
    {
      id: 'club-old-mutual',
      name: 'Old Mutual FC',
      shortName: 'OMFC',
      years: '[Years / Season: Click to edit]',
      position: 'Striker / Forward',
      tierOrLeague: 'Football Club',
      highlights: [
        'Fundamental youth & senior competitive club development',
        'Emphasis on tactical discipline and team unity',
        '[Editable highlight: Add appearances, goals, or key fixtures]'
      ],
      crestColor: '#006837',
      accentColor: '#f9a01b',
      isConfirmed: true,
      notes: 'Club 1 of 5 in verified career record'
    },
    {
      id: 'club-cape-umoya',
      name: 'Cape Umoya FC',
      shortName: 'CUFC',
      years: '[Years / Season: Click to edit]',
      position: 'Striker / Forward',
      tierOrLeague: 'National / Professional Football Club',
      highlights: [
        'High-intensity professional squad training and tactical adaptation',
        'Competitive squad inclusion and match preparation',
        '[Editable highlight: Add appearances, match highlights, or league details]'
      ],
      crestColor: '#1e3a8a',
      accentColor: '#38bdf8',
      isConfirmed: true,
      notes: 'Club 2 of 5 in verified career record'
    },
    {
      id: 'club-clarewood',
      name: 'Clarewood FC',
      shortName: 'CFC',
      years: '[Years / Season: Click to edit]',
      position: 'Striker / Forward',
      tierOrLeague: 'Football Club',
      highlights: [
        'Key attacking role contributing to squad momentum',
        'Disciplined performance across league fixtures',
        '[Editable highlight: Add match stats, assists, or tactical role]'
      ],
      crestColor: '#7c2d12',
      accentColor: '#eab308',
      isConfirmed: true,
      notes: 'Club 3 of 5 in verified career record'
    },
    {
      id: 'club-antalyaspor',
      name: 'Antalyaspor FC',
      shortName: 'AF',
      years: '[Years / Season: Click to edit]',
      position: 'Striker / Forward',
      tierOrLeague: 'International / Elite Football Club',
      highlights: [
        'Exposure to international standards, high-tempo training & professional facilities',
        'Advanced technical execution and physical conditioning',
        '[Editable highlight: Add trial period, squad details, or overseas development experience]'
      ],
      crestColor: '#dc2626',
      accentColor: '#ffffff',
      isConfirmed: true,
      notes: 'Club 4 of 5 in verified career record'
    },
    {
      id: 'club-vasco',
      name: 'Vasco FC',
      shortName: 'VFC',
      years: '[Years / Season: Click to edit]',
      position: 'Striker / Forward',
      tierOrLeague: 'Football Club',
      highlights: [
        'Senior squad competitive play with high commitment',
        'Displaying leadership, stamina, and clinical ball control',
        '[Editable highlight: Add current season stats, goals, or upcoming fixtures]'
      ],
      crestColor: '#18181b',
      accentColor: '#ef4444',
      isConfirmed: true,
      notes: 'Club 5 of 5 in verified career record'
    }
  ],

  highlightVideos: []
};

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Match Action — High-Tempo Transition',
    category: 'match',
    imageUrl: '/src/assets/images/football_action_shot_1791967424129.jpg',
    caption: 'Dynamic match action on the pitch under floodlights, executing quick turn and ball progression.',
    dateTag: 'Matchday'
  },
  {
    id: 'gal-2',
    title: 'Elite Training & Agility Sessions',
    category: 'training',
    imageUrl: '/src/assets/images/football_training_drill_1791967423588.jpg',
    caption: 'Precision agility drills and high-intensity speed work at training academy grounds.',
    dateTag: 'Training Ground'
  },
  {
    id: 'gal-3',
    title: 'Championship Stadium Atmosphere',
    category: 'club',
    imageUrl: '/src/assets/images/stadium_hero_bg_1791967424117.jpg',
    caption: 'Stadium lights and competitive football atmosphere.',
    dateTag: 'Arena'
  }
];
