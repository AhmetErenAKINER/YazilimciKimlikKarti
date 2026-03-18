import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Developer } from '../types/game';

type ConfirmDeleteModalProps = {
  visible: boolean;
  candidate: Developer | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  visible,
  candidate,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!candidate) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>Aday silinsin mi?</Text>
          <Text style={styles.message}>
            <Text style={styles.name}>{candidate.name}</Text> kaydini silmek istediginize emin misiniz?
          </Text>

          <View style={styles.actionRow}>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Vazgec</Text>
            </Pressable>
            <Pressable style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Sil</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },
  name: {
    color: '#F8FAFC',
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  cancelText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#7F1D1D',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  confirmText: {
    color: '#FECACA',
    fontSize: 14,
    fontWeight: '700',
  },
});
