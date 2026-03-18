import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { XP_PER_LEVEL } from '../constants/gameConfig';
import { AchievementState } from '../types/game';

type StatsPanelProps = {
  xp: number;
  bonusXp: number;
  recommendedCount: number;
  levelNumber: number;
  levelLabel: string;
  totalHires: number;
  perfectRounds: number;
  xpInCurrentLevel: number;
  progressPercent: number;
  achievements: AchievementState[];
  onResetRound: () => void;
};

export default function StatsPanel({
  xp,
  bonusXp,
  recommendedCount,
  levelNumber,
  levelLabel,
  totalHires,
  perfectRounds,
  xpInCurrentLevel,
  progressPercent,
  achievements,
  onResetRound,
}: StatsPanelProps) {
  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>Yetenek Yonetim Paneli</Text>
      <Text style={styles.statLine}>⭐ XP: {xp}</Text>
      <Text style={styles.statLine}>✨ Oneri Bonusu XP: {bonusXp}</Text>
      <Text style={styles.statLine}>🏆 Level {levelNumber} - {levelLabel}</Text>
      <Text style={styles.statLine}>👨‍💻 Toplam ise alim: {totalHires}</Text>
      <Text style={styles.statLine}>🌟 Onerilen aday sayisi: {recommendedCount}</Text>
      <Text style={styles.statLine}>🔁 Kusursuz tur: {perfectRounds}</Text>

      <View style={styles.progressWrapper}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Sonraki level: {xpInCurrentLevel}/{XP_PER_LEVEL} XP
        </Text>
      </View>

      <View style={styles.achievementContainer}>
        <Text style={styles.achievementTitle}>Basarimlar</Text>
        {achievements.map((achievement) => (
          <View
            key={achievement.id}
            style={[
              styles.achievementRow,
              achievement.unlocked ? styles.achievementUnlocked : styles.achievementLocked,
            ]}
          >
            <Text style={styles.achievementItem}>
              {achievement.icon} {achievement.label}
            </Text>
            <Text
              style={[
                styles.achievementState,
                achievement.unlocked ? styles.achievementStateUnlocked : styles.achievementStateLocked,
              ]}
            >
              {achievement.unlocked ? 'Acik' : 'Kilitli'}
            </Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.resetButton} onPress={onResetRound}>
        <Text style={styles.resetButtonText}>Yeni Tur Baslat</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  statLine: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 4,
  },
  progressWrapper: {
    marginTop: 8,
    marginBottom: 10,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#1F2937',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#8B5CF6',
  },
  progressText: {
    marginTop: 6,
    fontSize: 12,
    color: '#94A3B8',
  },
  achievementContainer: {
    marginTop: 8,
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#0F172A',
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E2E8F0',
    marginBottom: 4,
  },
  achievementItem: {
    fontSize: 13,
    color: '#94A3B8',
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 6,
  },
  achievementUnlocked: {
    backgroundColor: '#1E293B',
  },
  achievementLocked: {
    backgroundColor: '#111827',
  },
  achievementState: {
    fontSize: 11,
    fontWeight: '700',
  },
  achievementStateUnlocked: {
    color: '#22C55E',
  },
  achievementStateLocked: {
    color: '#94A3B8',
  },
  resetButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
