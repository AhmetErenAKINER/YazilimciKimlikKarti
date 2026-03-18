import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

type UndoToastProps = {
  visible: boolean;
  candidateName: string;
  onUndo: () => void;
};

export default function UndoToast({ visible, candidateName, onUndo }: UndoToastProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(26)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: visible ? 220 : 170,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: visible ? 0 : 26,
        duration: visible ? 220 : 170,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY, visible]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[styles.wrapper, { opacity, transform: [{ translateY }] }]}
    >
      <View style={styles.toast}>
        <View style={styles.glow} />
        <View style={styles.content}>
          <Text style={styles.label}>DevKimlik Bildirimi</Text>
          <Text style={styles.message}>
            <Text style={styles.name}>{candidateName}</Text> aday havuzundan kaldirildi.
          </Text>
        </View>
        <Pressable style={styles.button} onPress={onUndo}>
          <Text style={styles.buttonText}>Geri Al</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 18,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#4C1D95',
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  },
  glow: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 999,
    marginRight: 10,
    backgroundColor: '#A78BFA',
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  message: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '500',
  },
  name: {
    color: '#F8FAFC',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#7C3AED',
    borderWidth: 1,
    borderColor: '#A78BFA',
    borderRadius: 9,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
