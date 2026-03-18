import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AddCandidateForm from './src/components/AddCandidateForm';
import CandidateDeletePanel from './src/components/CandidateDeletePanel';
import CandidateDetailModal from './src/components/CandidateDetailModal';
import ConfirmDeleteModal from './src/components/ConfirmDeleteModal';
import StatsPanel from './src/components/StatsPanel';
import UndoToast from './src/components/UndoToast';
import UserCard from './src/components/UserCard';
import { SEARCH_SUGGESTIONS } from './src/constants/gameConfig';
import { useRecruitmentGame } from './src/hooks/useRecruitmentGame';
import { Developer } from './src/types/game';

type ActiveScreen = 'recruitment' | 'add-candidate';

export default function App() {
  const game = useRecruitmentGame();
  const [activeScreen, setActiveScreen] = React.useState<ActiveScreen>('recruitment');
  const [selectedCandidateId, setSelectedCandidateId] = React.useState<string | null>(null);
  const [candidateToDelete, setCandidateToDelete] = React.useState<Developer | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [lastDeletedCandidate, setLastDeletedCandidate] = React.useState<Developer | null>(null);
  const undoTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedCandidate =
    game.developers.find((developer) => developer.id === selectedCandidateId) ?? null;

  React.useEffect(() => {
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

  const filteredDevelopers = React.useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return game.developers;

    return game.developers.filter((developer) => {
      const searchable = [
        developer.name,
        developer.title,
        developer.level,
        developer.location,
        ...developer.skills,
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalized);
    });
  }, [game.developers, searchQuery]);

  const searchSuggestions = React.useMemo(() => {
    const data = [
      ...game.developers.map((candidate) => candidate.name),
      ...game.developers.map((candidate) => candidate.title),
      ...game.developers.map((candidate) => candidate.location),
      ...game.developers.flatMap((candidate) => candidate.skills),
      ...SEARCH_SUGGESTIONS,
    ];

    return Array.from(new Set(data))
      .filter((item) => item.toLowerCase().includes(searchQuery.trim().toLowerCase()))
      .slice(0, 6);
  }, [game.developers, searchQuery]);

  const handleInspectCandidate = (id: string) => {
    setSelectedCandidateId(id);
  };

  const handleCloseCandidateDetail = () => {
    setSelectedCandidateId(null);
  };

  const handleHireFromDetail = (id: string) => {
    game.hireDeveloper(id);
  };

  const handleRecommendFromDetail = (id: string) => {
    game.recommendCandidate(id);
  };

  const handleDeleteCandidate = (id: string) => {
    const removedCandidate = game.developers.find((developer) => developer.id === id) ?? null;
    game.removeDeveloper(id);

    if (removedCandidate) {
      setLastDeletedCandidate(removedCandidate);
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
      undoTimerRef.current = setTimeout(() => {
        setLastDeletedCandidate(null);
      }, 6000);
    }

    if (selectedCandidateId === id) {
      setSelectedCandidateId(null);
    }
  };

  const handleDeleteCandidateWithConfirm = (id: string) => {
    const candidate = game.developers.find((item) => item.id === id);
    if (!candidate) return;
    setCandidateToDelete(candidate);
  };

  const handleCancelDelete = () => {
    setCandidateToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!candidateToDelete) return;
    handleDeleteCandidate(candidateToDelete.id);
    setCandidateToDelete(null);
  };

  const handleAddCandidate = (input: Parameters<typeof game.addDeveloper>[0]) => {
    game.addDeveloper(input);
    setActiveScreen('recruitment');
  };

  const handleUndoDelete = () => {
    if (!lastDeletedCandidate) return;
    game.restoreDeveloper(lastDeletedCandidate);
    setLastDeletedCandidate(null);
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
      undoTimerRef.current = null;
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.brandHeader}>
          <Text style={styles.brandTitle}>DevKimlik</Text>
          <Text style={styles.brandSubtitle}>Yetenekleri incele, dogru kisiyi ise al.</Text>
        </View>

        <View style={styles.screenSwitcher}>
          <Pressable
            style={[
              styles.switchButton,
              activeScreen === 'recruitment' ? styles.switchButtonActive : null,
            ]}
            onPress={() => setActiveScreen('recruitment')}
          >
            <Text
              style={[
                styles.switchText,
                activeScreen === 'recruitment' ? styles.switchTextActive : null,
              ]}
            >
              Ise Alim
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.switchButton,
              activeScreen === 'add-candidate' ? styles.switchButtonActive : null,
            ]}
            onPress={() => setActiveScreen('add-candidate')}
          >
            <Text
              style={[
                styles.switchText,
                activeScreen === 'add-candidate' ? styles.switchTextActive : null,
              ]}
            >
              Aday Ekle
            </Text>
          </Pressable>
        </View>

        {activeScreen === 'recruitment' ? (
          <>
            <StatsPanel
              xp={game.xp}
              bonusXp={game.bonusXp}
              recommendedCount={game.recommendedCount}
              levelNumber={game.levelNumber}
              levelLabel={game.levelLabel}
              totalHires={game.totalHires}
              perfectRounds={game.perfectRounds}
              xpInCurrentLevel={game.xpInCurrentLevel}
              progressPercent={game.progressPercent}
              achievements={game.achievements}
              onResetRound={game.resetRound}
            />

            <View style={styles.searchCard}>
              <TextInput
                style={styles.searchInput}
                placeholder="Aday ara (isim, skill, lokasyon...)"
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <View style={styles.suggestionRow}>
                {searchSuggestions.map((suggestion) => (
                  <Pressable
                    key={suggestion}
                    style={styles.suggestionChip}
                    onPress={() => setSearchQuery(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {filteredDevelopers.map((developer) => (
              <UserCard
                key={developer.id}
                id={developer.id}
                name={developer.name}
                title={developer.title}
                level={developer.level}
                isAvailable={developer.isAvailable}
                isRecommended={developer.isRecommended}
                onInspect={handleInspectCandidate}
                onHire={game.hireDeveloper}
              />
            ))}

            {filteredDevelopers.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>Aramaya uygun aday bulunamadi.</Text>
              </View>
            ) : null}

            <CandidateDeletePanel
              candidates={game.developers}
              onDeleteCandidate={handleDeleteCandidateWithConfirm}
            />
          </>
        ) : (
          <AddCandidateForm onAddCandidate={handleAddCandidate} />
        )}

        <CandidateDetailModal
          visible={selectedCandidateId !== null}
          candidate={selectedCandidate}
          onClose={handleCloseCandidateDetail}
          onHire={handleHireFromDetail}
          onRecommend={handleRecommendFromDetail}
        />
      </ScrollView>

      <ConfirmDeleteModal
        visible={candidateToDelete !== null}
        candidate={candidateToDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <UndoToast
        visible={Boolean(lastDeletedCandidate)}
        candidateName={lastDeletedCandidate?.name ?? ''}
        onUndo={handleUndoDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  container: {
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    gap: 12,
    minHeight: '100%',
  },
  brandHeader: {
    width: '100%',
    maxWidth: 360,
    marginTop: 18,
    marginBottom: 8,
    alignItems: 'center',
  },
  brandTitle: {
    color: '#F8FAFC',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.6,
    textAlign: 'center',
    fontStyle: 'italic',
    textShadowColor: 'rgba(139, 92, 246, 0.45)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  brandSubtitle: {
    marginTop: 6,
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
  },
  screenSwitcher: {
    width: '100%',
    maxWidth: 360,
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 4,
    marginBottom: 4,
  },
  switchButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 9,
  },
  switchButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  switchText: {
    color: '#94A3B8',
    fontWeight: '700',
    fontSize: 13,
  },
  switchTextActive: {
    color: '#FFFFFF',
  },
  searchCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 12,
  },
  searchInput: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#E2E8F0',
    fontSize: 14,
  },
  suggestionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  suggestionChip: {
    borderWidth: 1,
    borderColor: '#4C1D95',
    backgroundColor: '#1E1B4B',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  suggestionText: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 12,
    backgroundColor: '#0F172A',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
  },
});

