import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NewDeveloperInput } from '../types/game';

type AddCandidateFormProps = {
  onAddCandidate: (input: NewDeveloperInput) => void;
};

export default function AddCandidateForm({ onAddCandidate }: AddCandidateFormProps) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [skills, setSkills] = useState('');
  const [summary, setSummary] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearForm = () => {
    setName('');
    setTitle('');
    setLevel('');
    setLocation('');
    setExperienceYears('');
    setSkills('');
    setSummary('');
    setCurrentProject('');
  };

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    if (
      !name.trim() ||
      !title.trim() ||
      !level.trim() ||
      !location.trim() ||
      !experienceYears.trim() ||
      !skills.trim() ||
      !summary.trim() ||
      !currentProject.trim()
    ) {
      setError('Lutfen tum alanlari doldurun.');
      return;
    }

    const parsedYears = Number(experienceYears);
    if (!Number.isFinite(parsedYears) || parsedYears < 0) {
      setError('Deneyim yili gecerli bir sayi olmali.');
      return;
    }

    const skillList = skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skillList.length === 0) {
      setError('En az bir yetenek girin.');
      return;
    }

    onAddCandidate({
      name: name.trim(),
      title: title.trim(),
      level: level.trim(),
      location: location.trim(),
      experienceYears: parsedYears,
      skills: skillList,
      summary: summary.trim(),
      currentProject: currentProject.trim(),
    });

    clearForm();
    setSuccess('Aday basariyla eklendi. Ise alim ekraninda gorulebilir.');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Aday Ekle</Text>
      <Text style={styles.subtitle}>Yeni bir aday olusturup havuza ekleyin.</Text>

      <TextInput style={styles.input} placeholder="Ad Soyad" placeholderTextColor="#94A3B8" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Unvan (Title)" placeholderTextColor="#94A3B8" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Seviye (Junior/Mid/Senior)" placeholderTextColor="#94A3B8" value={level} onChangeText={setLevel} />
      <TextInput style={styles.input} placeholder="Konum" placeholderTextColor="#94A3B8" value={location} onChangeText={setLocation} />
      <TextInput
        style={styles.input}
        placeholder="Deneyim (Yil)"
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        value={experienceYears}
        onChangeText={setExperienceYears}
      />
      <TextInput
        style={styles.input}
        placeholder="Yetenekler (virgulle ayir)"
        placeholderTextColor="#94A3B8"
        value={skills}
        onChangeText={setSkills}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Profesyonel ozet"
        placeholderTextColor="#94A3B8"
        value={summary}
        onChangeText={setSummary}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Aktif Proje"
        placeholderTextColor="#94A3B8"
        value={currentProject}
        onChangeText={setCurrentProject}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Adayi Kaydet</Text>
      </Pressable>
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
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 13,
    color: '#94A3B8',
  },
  input: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#E2E8F0',
    marginBottom: 10,
    fontSize: 14,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 4,
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  errorText: {
    color: '#FCA5A5',
    marginBottom: 8,
    fontSize: 12,
  },
  successText: {
    color: '#86EFAC',
    marginBottom: 8,
    fontSize: 12,
  },
});
