import { useMemo, useState } from 'react';
import {
  ACHIEVEMENT_RULES,
  getPlayerLevelLabel,
  INITIAL_DEVELOPERS,
  XP_PER_HIRE,
  XP_PER_LEVEL,
  XP_PER_RECOMMENDATION,
} from '../constants/gameConfig';
import { AchievementState, Developer, NewDeveloperInput } from '../types/game';

type UseRecruitmentGameResult = {
  developers: Developer[];
  totalHires: number;
  bonusXp: number;
  recommendedCount: number;
  perfectRounds: number;
  xp: number;
  levelNumber: number;
  levelLabel: string;
  xpInCurrentLevel: number;
  progressPercent: number;
  achievements: AchievementState[];
  hireDeveloper: (id: string) => void;
  recommendCandidate: (id: string) => void;
  addDeveloper: (input: NewDeveloperInput) => void;
  removeDeveloper: (id: string) => void;
  restoreDeveloper: (developer: Developer) => void;
  resetRound: () => void;
};

export function useRecruitmentGame(): UseRecruitmentGameResult {
  const [developers, setDevelopers] = useState<Developer[]>(INITIAL_DEVELOPERS);
  const [totalHires, setTotalHires] = useState(0);
  const [bonusXp, setBonusXp] = useState(0);
  const [perfectRounds, setPerfectRounds] = useState(0);

  const hiredInRound = developers.filter((developer) => !developer.isAvailable).length;
  const recommendedCount = developers.filter((developer) => developer.isRecommended).length;
  const xp = totalHires * XP_PER_HIRE + bonusXp;
  const levelNumber = Math.floor(xp / XP_PER_LEVEL) + 1;
  const levelLabel = useMemo(() => getPlayerLevelLabel(levelNumber), [levelNumber]);
  const xpInCurrentLevel = xp % XP_PER_LEVEL;
  const progressPercent = Math.min((xpInCurrentLevel / XP_PER_LEVEL) * 100, 100);

  const achievements = useMemo<AchievementState[]>(
    () => {
      const metrics = {
        totalHires,
        hiredInRound,
        totalDevelopers: developers.length,
        perfectRounds,
      };

      return ACHIEVEMENT_RULES.map((rule) => ({
        id: rule.id,
        icon: rule.icon,
        label: rule.label,
        unlocked: rule.isUnlocked(metrics),
      }));
    },
    [developers.length, hiredInRound, perfectRounds, totalHires]
  );

  const hireDeveloper = (id: string) => {
    setDevelopers((prev) => {
      const canHire = prev.some((developer) => developer.id === id && developer.isAvailable);
      if (!canHire) return prev;

      setTotalHires((count) => count + 1);
      return prev.map((developer) =>
        developer.id === id ? { ...developer, isAvailable: false } : developer
      );
    });
  };

  const recommendCandidate = (id: string) => {
    setDevelopers((prev) => {
      const canRecommend = prev.some(
        (developer) => developer.id === id && !developer.isRecommended
      );
      if (!canRecommend) return prev;

      setBonusXp((current) => current + XP_PER_RECOMMENDATION);
      return prev.map((developer) =>
        developer.id === id ? { ...developer, isRecommended: true } : developer
      );
    });
  };

  const resetRound = () => {
    const allHired = developers.every((developer) => !developer.isAvailable);
    if (allHired) {
      setPerfectRounds((prev) => prev + 1);
    }
    setDevelopers((prev) => prev.map((developer) => ({ ...developer, isAvailable: true })));
  };

  const addDeveloper = (input: NewDeveloperInput) => {
    const normalizedId = `dev-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newDeveloper: Developer = {
      id: normalizedId,
      isAvailable: true,
      isRecommended: false,
      ...input,
    };
    setDevelopers((prev) => [...prev, newDeveloper]);
  };

  const removeDeveloper = (id: string) => {
    setDevelopers((prev) => prev.filter((developer) => developer.id !== id));
  };

  const restoreDeveloper = (developer: Developer) => {
    setDevelopers((prev) => {
      const alreadyExists = prev.some((candidate) => candidate.id === developer.id);
      if (alreadyExists) return prev;
      return [...prev, developer];
    });
  };

  return {
    developers,
    totalHires,
    bonusXp,
    recommendedCount,
    perfectRounds,
    xp,
    levelNumber,
    levelLabel,
    xpInCurrentLevel,
    progressPercent,
    achievements,
    hireDeveloper,
    recommendCandidate,
    addDeveloper,
    removeDeveloper,
    restoreDeveloper,
    resetRound,
  };
}
