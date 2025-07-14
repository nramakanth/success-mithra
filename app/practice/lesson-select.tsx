import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

const MOCK_LESSONS: Record<string, { name: string; id: string }[]> = {
  Physics: [
    { id: 'mech', name: 'Mechanics' },
    { id: 'thermo', name: 'Thermodynamics' },
    { id: 'waves', name: 'Waves' },
    { id: 'optics', name: 'Optics' },
    { id: 'em', name: 'Electromagnetism' },
  ],
  Chemistry: [
    { id: 'org', name: 'Organic Chemistry' },
    { id: 'inorg', name: 'Inorganic Chemistry' },
    { id: 'phy', name: 'Physical Chemistry' },
    { id: 'env', name: 'Environmental Chemistry' },
  ],
  Mathematics: [
    { id: 'alg', name: 'Algebra' },
    { id: 'calc', name: 'Calculus' },
    { id: 'geo', name: 'Geometry' },
    { id: 'trig', name: 'Trigonometry' },
    { id: 'stat', name: 'Statistics' },
  ],
  Botany: [
    { id: 'plantphys', name: 'Plant Physiology' },
    { id: 'genetics', name: 'Genetics' },
    { id: 'ecology', name: 'Ecology' },
    { id: 'morphology', name: 'Morphology' },
    { id: 'anatomy', name: 'Anatomy' },
  ],
  Zoology: [
    { id: 'humanphys', name: 'Human Physiology' },
    { id: 'animaldiv', name: 'Animal Diversity' },
    { id: 'cellbio', name: 'Cell Biology' },
    { id: 'geneticsz', name: 'Genetics' },
    { id: 'evolution', name: 'Evolution' },
  ],
};

export default function LessonSelect() {
  const router = useRouter();
  const { subject } = useLocalSearchParams();
  const lessons = MOCK_LESSONS[subject as string] || [];
  const [selected, setSelected] = useState<string[]>([]);

  const toggleLesson = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleProceed = () => {
    if (selected.length === 0) return;
    router.push({
      pathname: '/test/instructions',
      params: {
        subject,
        lessons: JSON.stringify(selected),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Chapters</Text>
        <Text style={styles.headerSubtitle}>{subject}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={[
              styles.card,
              selected.includes(lesson.name) && styles.cardSelected,
            ]}
            onPress={() => toggleLesson(lesson.name)}
            activeOpacity={0.85}
          >
            <Text style={[styles.lessonName, selected.includes(lesson.name) && styles.lessonNameSelected]}>{lesson.name}</Text>
            {selected.includes(lesson.name) && (
              <View style={styles.selectedMark}>
                <Text style={styles.selectedMarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
        <View style={{ height: 120 }} />
      </ScrollView>
      <TouchableOpacity
        style={[styles.proceedBtn, { backgroundColor: selected.length ? '#F4A261' : '#f1f5f9' }]}
        onPress={handleProceed}
        disabled={selected.length === 0}
        activeOpacity={0.9}
      >
        <Text style={[styles.proceedBtnText, { color: selected.length ? '#fff' : '#aaa' }]}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 0,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#3A7CA5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 62,
    left: 18,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#F4A261',
    backgroundColor: '#fef6f0',
    shadowColor: '#F4A261',
    shadowOpacity: 0.18,
    elevation: 4,
  },
  lessonName: {
    fontSize: 14,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    flex: 1,
  },
  lessonNameSelected: {
    color: '#F4A261',
  },
  selectedMark: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F4A261',
  },
  selectedMarkText: {
    color: '#F4A261',
    fontSize: 16,
    fontWeight: 'bold',
  },
  proceedBtn: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  proceedBtnText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
}); 