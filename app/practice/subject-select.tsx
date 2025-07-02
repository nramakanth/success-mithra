import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { BookOpen, FlaskConical, Sigma, Leaf, BookText, Laptop } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const SUBJECTS = [
  { name: 'Physics', chapters: 24, color: '#3A7CA5', icon: BookOpen },
  { name: 'Chemistry', chapters: 22, color: '#F4A261', icon: FlaskConical },
  { name: 'Mathematics', chapters: 20, color: '#10b981', icon: Sigma },
  { name: 'Biology', chapters: 18, color: '#ef4444', icon: Leaf },
  { name: 'English', chapters: 15, color: '#f59e0b', icon: BookText },
  { name: 'Computer Science', chapters: 12, color: '#764ba2', icon: Laptop },
  // Add more subjects as needed
];

const { width } = Dimensions.get('window');

export default function SubjectSelect() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSubject = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleStart = () => {
    if (selected.length === 0) return;
    router.push({
      pathname: '/test/instructions',
      params: {
        subjects: JSON.stringify(selected),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Subject(s)</Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {SUBJECTS.map((subject) => {
          const Icon = subject.icon;
          const isSelected = selected.includes(subject.name);
          return (
            <TouchableOpacity
              key={subject.name}
              style={[
                styles.card,
                { backgroundColor: isSelected ? subject.color : '#fff', borderColor: isSelected ? subject.color : '#e5e7eb' },
                isSelected && styles.cardSelected,
              ]}
              onPress={() => toggleSubject(subject.name)}
              activeOpacity={0.85}
            >
              <View style={[styles.iconCircle, { backgroundColor: isSelected ? '#fff' : subject.color }]}> 
                <Icon size={28} color={isSelected ? subject.color : '#fff'} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={[styles.subjectName, { color: isSelected ? '#fff' : subject.color }]}>{subject.name}</Text>
                <Text style={[styles.chapters, { color: isSelected ? '#fff' : '#64748b' }]}>{subject.chapters} Chapters</Text>
              </View>
              {isSelected && (
                <View style={styles.selectedMark}>
                  <Text style={styles.selectedMarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 120 }} />
      </ScrollView>
      <TouchableOpacity
        style={[styles.startBtn, { backgroundColor: selected.length ? '#F4A261' : '#f1f5f9' }]}
        onPress={handleStart}
        disabled={selected.length === 0}
        activeOpacity={0.9}
      >
        <Text style={[styles.startBtnText, { color: selected.length ? '#fff' : '#aaa' }]}>Start Practice</Text>
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
  
  title: {
    fontSize: 28,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 24,
    marginBottom: 18,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  cardSelected: {
    shadowColor: '#F4A261',
    shadowOpacity: 0.18,
    elevation: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  cardInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  chapters: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  selectedMark: {
    position: 'absolute',
    top: 16,
    right: 20,
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
  startBtn: {
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
  startBtnText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
}); 