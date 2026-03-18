import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Developer } from '../types/game';

type CandidateDeletePanelProps = {
  candidates: Developer[];
  onDeleteCandidate: (id: string) => void;
};

export default function CandidateDeletePanel({
  candidates,
  onDeleteCandidate,
}: CandidateDeletePanelProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Aday Sil</Text>
      <Text style={styles.subtitle}>Tum adaylar bu listede. Silmek istedigin adayi sec.</Text>

      {candidates.map((candidate) => (
        <View key={candidate.id} style={styles.row}>
          <View style={styles.infoBox}>
            <Text style={styles.name}>{candidate.name}</Text>
            <Text style={styles.meta}>
              {candidate.title} • {candidate.level}
            </Text>
          </View>
          <Pressable style={styles.deleteButton} onPress={() => onDeleteCandidate(candidate.id)}>
            <Text style={styles.deleteText}>Sil</Text>
          </Pressable>
        </View>
      ))}

      {candidates.length === 0 ? (
        <Text style={styles.emptyText}>Aramaya uygun aday bulunamadi.</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 12,
    color: '#94A3B8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 10,
    marginBottom: 8,
    gap: 8,
  },
  infoBox: {
    flex: 1,
  },
  name: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  meta: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#7F1D1D',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  deleteText: {
    color: '#FECACA',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
});
