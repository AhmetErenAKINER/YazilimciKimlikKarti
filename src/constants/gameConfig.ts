import { AchievementRule, Developer } from '../types/game';

export const XP_PER_HIRE = 10;
export const XP_PER_LEVEL = 40;
export const XP_PER_RECOMMENDATION = 15;
export const SEARCH_SUGGESTIONS = [
  'Senior',
  'Junior',
  'React Native',
  'Backend',
  'DevOps',
  'Istanbul',
];

export const INITIAL_DEVELOPERS: Developer[] = [
  {
    id: 'dev-1',
    name: 'Ahmet Eren AKINER',
    title: 'Senior Developer',
    level: 'Expert',
    isAvailable: true,
    isRecommended: false,
    location: 'Istanbul',
    experienceYears: 8,
    skills: ['React Native', 'TypeScript', 'System Design'],
    summary: 'Urun odakli mobil mimariler ve performans optimizasyonu konusunda guclu.',
    currentProject: 'Kurumsal Super App',
  },
  {
    id: 'dev-2',
    name: 'Samet Karahan',
    title: 'Developer',
    level: 'Junior',
    isAvailable: true,
    isRecommended: false,
    location: 'Ankara',
    experienceYears: 2,
    skills: ['React', 'JavaScript', 'UI Components'],
    summary: 'Hizli ogrenir, component gelistirme ve arayuz duzeninde guclu.',
    currentProject: 'Kurum ici dashboard',
  },
  {
    id: 'dev-3',
    name: 'Elif Yildiz',
    title: 'Mobile Developer',
    level: 'Mid',
    isAvailable: true,
    isRecommended: false,
    location: 'Izmir',
    experienceYears: 4,
    skills: ['React Native', 'Expo', 'CI/CD'],
    summary: 'Mobil release sureclerinde ve uygulama kararliliginda deneyimli.',
    currentProject: 'E-ticaret mobil uygulamasi',
  },
  {
    id: 'dev-4',
    name: 'Mert Demir',
    title: 'Backend Developer',
    level: 'Senior',
    isAvailable: true,
    isRecommended: false,
    location: 'Bursa',
    experienceYears: 7,
    skills: ['Node.js', 'PostgreSQL', 'Microservices'],
    summary: 'Yuksek trafige dayanikli API tasarimi ve veri modeli uzmanligi var.',
    currentProject: 'Fintech odeme sistemi',
  },
  {
    id: 'dev-5',
    name: 'Selin Acar',
    title: 'UI/UX Engineer',
    level: 'Mid',
    isAvailable: true,
    isRecommended: false,
    location: 'Istanbul',
    experienceYears: 5,
    skills: ['Design Systems', 'Figma', 'Accessibility'],
    summary: 'Kullanici deneyimini olculebilir metriklerle iyilestirmeye odakli.',
    currentProject: 'SaaS tasarim sistemi',
  },
  {
    id: 'dev-6',
    name: 'Burak Koc',
    title: 'DevOps Engineer',
    level: 'Senior',
    isAvailable: true,
    isRecommended: false,
    location: 'Eskisehir',
    experienceYears: 6,
    skills: ['Docker', 'Kubernetes', 'Observability'],
    summary: 'Dagitim otomasyonu ve altyapi guvenilirligi tarafinda guclu tecrube.',
    currentProject: 'Bulut migrasyon programi',
  },
];

export const ACHIEVEMENT_RULES: AchievementRule[] = [
  {
    id: 'first-hire',
    icon: '🏁',
    label: 'Ilk Ise Alim',
    isUnlocked: (metrics) => metrics.totalHires >= 1,
  },
  {
    id: 'productive-hr',
    icon: '🔥',
    label: 'Uretken IK',
    isUnlocked: (metrics) => metrics.totalHires >= 5,
  },
  {
    id: 'headhunter',
    icon: '🧠',
    label: 'Headhunter (10+ Ise Alim)',
    isUnlocked: (metrics) => metrics.totalHires >= 10,
  },
  {
    id: 'full-roster',
    icon: '🎯',
    label: 'Tum Adaylar Projede',
    isUnlocked: (metrics) => metrics.hiredInRound === metrics.totalDevelopers,
  },
  {
    id: 'perfect-round',
    icon: '👑',
    label: 'Kusursuz Tur Ustasi',
    isUnlocked: (metrics) => metrics.perfectRounds >= 2,
  },
];

export function getPlayerLevelLabel(level: number): string {
  if (level >= 5) return 'Legend Recruiter';
  if (level >= 4) return 'Principal Recruiter';
  if (level >= 3) return 'Senior Recruiter';
  if (level >= 2) return 'Mid Recruiter';
  return 'Junior Recruiter';
}
