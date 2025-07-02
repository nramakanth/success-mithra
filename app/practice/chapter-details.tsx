import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, BookOpen, BarChart3, RefreshCcw, CheckCircle2 } from 'lucide-react-native';

export default function ChapterDetails() {
  const router = useRouter();
  // These would come from params or API in a real app
  const { subject = 'Physics', chapter = 'Mechanics' } = useLocalSearchParams();
  const progress = 85;
  const questionsAttempted = 45;
  const totalQuestions = 50;
  const accuracy = 92;
  const lastPracticed = '2 days ago';
  const recentAttempts = [
    { date: '2024-05-01', score: '38/50', accuracy: '76%' },
    { date: '2024-04-28', score: '42/50', accuracy: '84%' },
    { date: '2024-04-25', score: '45/50', accuracy: '90%' },
  ];

  const handleStartExam = () => {
    router.push({
      pathname: '/test/instructions',
      params: { subject, lessons: JSON.stringify([chapter]) },
    });
  };

  const handleReview = () => {
    router.push({
      pathname: '/test/review',
      params: {
        subject,
        lessons: JSON.stringify([chapter]),
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.chapter}>{chapter}</Text>
      </View>
      <View style={styles.progressCard}>
        <Text style={styles.progressLabel}>Progress</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressPercent}>{progress}% Complete</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <BookOpen size={20} color="#3A7CA5" />
          <Text style={styles.statValue}>{questionsAttempted}/{totalQuestions}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </View>
        <View style={styles.statCard}>
          <BarChart3 size={20} color="#10b981" />
          <Text style={[styles.statValue, { color: '#10b981' }]}>{accuracy}%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
        <View style={styles.statCard}>
          <RefreshCcw size={20} color="#F4A261" />
          <Text style={styles.statValue}>{lastPracticed}</Text>
          <Text style={styles.statLabel}>Last Practiced</Text>
        </View>
      </View>
      <View style={styles.practiceOptions}>
        <View style={styles.practiceBtnCard}>
          <View style={styles.practiceBtnCardLeft}>
            <View style={[styles.practiceBtnCardIcon, { backgroundColor: '#f0f4ff' }]}> 
              <BookOpen size={24} color="#3A7CA5" />
            </View>
            <Text style={styles.practiceBtnCardText}>Resume Practice</Text>
          </View>
          <TouchableOpacity style={[styles.practiceBtnCardAction, { backgroundColor: '#3A7CA5' }]} onPress={handleStartExam}> 
            <Text style={styles.practiceBtnCardActionText}>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.practiceBtnCard}>
          <View style={styles.practiceBtnCardLeft}>
            <View style={[styles.practiceBtnCardIcon, { backgroundColor: '#f0fdf4' }]}> 
              <CheckCircle2 size={24} color="#10b981" />
            </View>
            <Text style={styles.practiceBtnCardText}>New Practice</Text>
          </View>
          <TouchableOpacity style={[styles.practiceBtnCardAction, { backgroundColor: '#10b981' }]} onPress={handleStartExam}> 
            <Text style={styles.practiceBtnCardActionText}>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.practiceBtnCard}>
          <View style={styles.practiceBtnCardLeft}>
            <View style={[styles.practiceBtnCardIcon, { backgroundColor: '#fffbe6' }]}> 
              <BarChart3 size={24} color="#F4A261" />
            </View>
            <Text style={styles.practiceBtnCardText}>Review Mistakes</Text>
          </View>
          <TouchableOpacity style={styles.practiceBtnCardActionOutlined} onPress={handleReview}> 
            <Text style={styles.practiceBtnCardActionTextOutlined}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.recentAttemptsSection}>
        <Text style={styles.recentAttemptsTitle}>Recent Attempts</Text>
        {recentAttempts.map((attempt, idx) => (
          <View key={idx} style={styles.attemptCard}>
            <Text style={styles.attemptDate}>{attempt.date}</Text>
            <Text style={styles.attemptScore}>{attempt.score}</Text>
            <Text style={styles.attemptAccuracy}>{attempt.accuracy}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 54,
    paddingBottom: 28,
    paddingHorizontal: 24,
    backgroundColor: '#3A7CA5',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 18,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    top: 54,
    left: 18,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subject: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  chapter: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  progressLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3A7CA5',
    borderRadius: 5,
  },
  progressPercent: {
    fontSize: 16,
    color: '#3A7CA5',
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 18,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 16,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  practiceOptions: {
    marginHorizontal: 18,
    marginBottom: 28,
    gap: 18,
  },
  practiceBtnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 22,
    marginBottom: 0,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    marginTop: 0,
    marginHorizontal: 0,
  },
  practiceBtnCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  practiceBtnCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  practiceBtnCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    letterSpacing: 0.2,
  },
  practiceBtnCardAction: {
    backgroundColor: '#3A7CA5',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  practiceBtnCardActionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  practiceBtnCardActionOutlined: {
    borderWidth: 2,
    borderColor: '#F4A261',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  practiceBtnCardActionTextOutlined: {
    color: '#F4A261',
    fontWeight: 'bold',
    fontSize: 15,
  },
  recentAttemptsSection: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  recentAttemptsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 12,
  },
  attemptCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 10,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  attemptDate: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: 'bold',
  },
  attemptScore: {
    fontSize: 16,
    color: '#3A7CA5',
    fontWeight: 'bold',
  },
  attemptAccuracy: {
    fontSize: 15,
    color: '#10b981',
    fontWeight: 'bold',
  },
}); 