import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type UserCardProps = {
  name: string;
  title: string;
  level: string;
};

const AVAILABLE_BUTTON_LABEL = 'İşe Al';
const BUSY_BUTTON_LABEL = 'Projelerde Çalışıyor';

export default function UserCard({ name, title, level }: UserCardProps) {
  const [musaitMi, setMusaitMi] = useState(true);

  const statusEmoji = musaitMi ? '😀' : '💼';
  const statusText = musaitMi ? 'Müsait' : 'Projede';
  const buttonLabel = musaitMi ? AVAILABLE_BUTTON_LABEL : BUSY_BUTTON_LABEL;

  return (
    <View style={[styles.card, musaitMi ? styles.cardAvailable : styles.cardBusy]}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.badge, musaitMi ? styles.badgeAvailable : styles.badgeBusy]}>
          <Text style={styles.badgeText}>
            {statusEmoji} {statusText}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.level}>Seviye: {level}</Text>

      <Pressable
        style={[styles.button, musaitMi ? styles.buttonAvailable : styles.buttonBusy]}
        onPress={() => setMusaitMi(false)}
        disabled={!musaitMi}
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
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  cardAvailable: {
    backgroundColor: '#F0FDF4',
  },
  cardBusy: {
    backgroundColor: '#F9FAFB',
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
    color: '#111827',
    flexShrink: 1,
  },
  title: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeAvailable: {
    backgroundColor: '#DCFCE7',
  },
  badgeBusy: {
    backgroundColor: '#FEE2E2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonAvailable: {
    backgroundColor: '#2563EB',
  },
  buttonBusy: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});