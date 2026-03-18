import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Developer } from '../types/game';

type CandidateDetailModalProps = {
  visible: boolean;
  candidate: Developer | null;
  onClose: () => void;
  onHire: (id: string) => void;
  onRecommend: (id: string) => void;
};

export default function CandidateDetailModal({
  visible,
  candidate,
  onClose,
  onHire,
  onRecommend,
}: CandidateDetailModalProps) {
  if (!candidate) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.name}>{candidate.name}</Text>
            <Text style={styles.meta}>
              {candidate.title} • Seviye: {candidate.level}
            </Text>
            <Text style={styles.meta}>Konum: {candidate.location}</Text>
            <Text style={styles.meta}>Deneyim: {candidate.experienceYears} yil</Text>
            <Text style={styles.meta}>Aktif Proje: {candidate.currentProject}</Text>
            <Text style={styles.meta}>
              Durum: {candidate.isRecommended ? '⭐ Onerilen Aday' : 'Standart Aday'}
            </Text>

            <Text style={styles.sectionTitle}>Profesyonel Ozet</Text>
            <Text style={styles.summary}>{candidate.summary}</Text>

            <Text style={styles.sectionTitle}>Yetenekler</Text>
            <View style={styles.skillsRow}>
              {candidate.skills.map((skill) => (
                <View key={skill} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actionRow}>
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>Geri Don</Text>
              </Pressable>
              <Pressable
                style={[styles.recommendButton, candidate.isRecommended ? styles.recommendButtonDone : null]}
                onPress={() => onRecommend(candidate.id)}
                disabled={candidate.isRecommended}
              >
                <Text style={styles.recommendText}>
                  {candidate.isRecommended ? 'Onerildi' : 'Onerilen Aday Yap'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.hireButton, !candidate.isAvailable ? styles.hireButtonDisabled : null]}
                onPress={() => onHire(candidate.id)}
                disabled={!candidate.isAvailable}
              >
                <Text style={styles.hireText}>
                  {candidate.isAvailable ? 'Bu Adayi Ise Al' : 'Aday Projede'}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.76)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    maxHeight: '85%',
  },
  content: {
    padding: 20,
    gap: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  meta: {
    fontSize: 14,
    color: '#CBD5E1',
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#E9D5FF',
  },
  summary: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  skillText: {
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  hireButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  hireButtonDisabled: {
    backgroundColor: '#64748B',
  },
  hireText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  recommendButton: {
    flex: 1,
    backgroundColor: '#0F766E',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  recommendButtonDone: {
    backgroundColor: '#475569',
  },
  recommendText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
