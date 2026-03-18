export type Developer = {
  id: string;
  name: string;
  title: string;
  level: string;
  isAvailable: boolean;
  isRecommended: boolean;
  location: string;
  experienceYears: number;
  skills: string[];
  summary: string;
  currentProject: string;
};

export type NewDeveloperInput = Omit<Developer, 'id' | 'isAvailable' | 'isRecommended'>;

export type AchievementDefinition = {
  id: string;
  icon: string;
  label: string;
};

export type AchievementState = AchievementDefinition & {
  unlocked: boolean;
};

export type GameMetrics = {
  totalHires: number;
  hiredInRound: number;
  totalDevelopers: number;
  perfectRounds: number;
};

export type AchievementRule = AchievementDefinition & {
  isUnlocked: (metrics: GameMetrics) => boolean;
};
