import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { XP_PER_HIRE } from '../constants/gameConfig';

type UserCardProps = {
  id: string;
  name: string;
  title: string;
  level: string;
  isAvailable: boolean;
  isRecommended: boolean;
  onInspect: (id: string) => void;
  onHire: (id: string) => void;
};

const AVAILABLE_BUTTON_LABEL = 'İşe Al';
const BUSY_BUTTON_LABEL = 'Projelerde Çalışıyor';

export default function UserCard({
  id,
  name,
  title,
  level,
  isAvailable,
  isRecommended,
  onInspect,
  onHire,
}: UserCardProps) {
  const statusEmoji = isAvailable ? '😀' : '💼';
  const statusText = isAvailable ? 'Müsait' : 'Projede';
  const buttonLabel = isAvailable ? AVAILABLE_BUTTON_LABEL : BUSY_BUTTON_LABEL;

  return (
    <View style={[styles.card, isAvailable ? styles.cardAvailable : styles.cardBusy]}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.badge, isAvailable ? styles.badgeAvailable : styles.badgeBusy]}>
          <Text style={styles.badgeText}>
            {statusEmoji} {statusText}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.level}>Seviye: {level}</Text>
      {isRecommended ? <Text style={styles.recommended}>⭐ Onerilen Aday</Text> : null}
      {isAvailable ? <Text style={styles.reward}>+{XP_PER_HIRE} XP kazan</Text> : null}

      <Pressable style={styles.inspectButton} onPress={() => onInspect(id)}>
        <Text style={styles.inspectButtonText}>Adayi Incele</Text>
      </Pressable>

      <Pressable
        style={[styles.button, isAvailable ? styles.buttonAvailable : styles.buttonBusy]}
        onPress={() => onHire(id)}
        disabled={!isAvailable}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 4,
  },
  cardAvailable: {
    backgroundColor: '#111827',
  },
  cardBusy: {
    backgroundColor: '#1E293B',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  name: {
    fontSize: 19,
    fontWeight: '700',
    color: '#F8FAFC',
    flexShrink: 1,
  },
  title: {
    fontSize: 15,
    color: '#CBD5E1',
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  reward: {
    fontSize: 13,
    color: '#FBBF24',
    marginBottom: 14,
    fontWeight: '600',
  },
  recommended: {
    fontSize: 13,
    color: '#A78BFA',
    marginBottom: 6,
    fontWeight: '700',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeAvailable: {
    backgroundColor: '#0F766E',
  },
  badgeBusy: {
    backgroundColor: '#B45309',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  inspectButton: {
    borderWidth: 1,
    borderColor: '#8B5CF6',
    backgroundColor: '#1F2937',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  inspectButtonText: {
    color: '#E9D5FF',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonAvailable: {
    backgroundColor: '#8B5CF6',
  },
  buttonBusy: {
    backgroundColor: '#64748B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});