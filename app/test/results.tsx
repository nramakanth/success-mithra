import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle, XCircle, Home, LogOut } from 'lucide-react-native';

function getResults(answers: any, subject?: string) {
  // For mock: use the same MOCK_QUESTIONS as in exam.tsx
  const MOCK_QUESTIONS = [
    { id: 1, subject: 'Physics', options: [{ isCorrect: true }, { isCorrect: false }, { isCorrect: false }, { isCorrect: false }], multiple: false },
    { id: 2, subject: 'Physics', options: [{ isCorrect: false }, { isCorrect: true }, { isCorrect: false }, { isCorrect: false }], multiple: false },
    { id: 3, subject: 'Mathematics', options: [{ isCorrect: true }, { isCorrect: true }, { isCorrect: false }, { isCorrect: true }], multiple: true },
    { id: 4, subject: 'Chemistry', options: [{ isCorrect: false }, { isCorrect: true }, { isCorrect: false }, { isCorrect: false }], multiple: false },
    { id: 5, subject: 'Mathematics', options: [{ isCorrect: false }, { isCorrect: true }, { isCorrect: false }, { isCorrect: false }], multiple: false },
  ];
  let correct = 0, wrong = 0, skipped = 0, total = 0;
  let subjectStats: Record<string, { correct: number; total: number }> = {};
  let questions = subject ? MOCK_QUESTIONS.filter(q => q.subject === subject) : MOCK_QUESTIONS;
  total = questions.length;
  questions.forEach((q) => {
    const userAns = answers[q.id] || [];
    const correctAns = q.options.map((o, i) => o.isCorrect ? i : null).filter(i => i !== null);
    if (!subjectStats[q.subject]) subjectStats[q.subject] = { correct: 0, total: 0 };
    subjectStats[q.subject].total++;
    if (userAns.length === 0) {
      skipped++;
    } else if (userAns.length === correctAns.length && userAns.every((v: number) => correctAns.includes(v))) {
      correct++;
      subjectStats[q.subject].correct++;
    } else {
      wrong++;
    }
  });
  return { correct, wrong, skipped, total, subjectStats };
}

function getLessonResults(answers: any, lessons: string[]) {
  // Generate mock questions for each lesson
  let lessonStats: Record<string, { correct: number; total: number }> = {};
  let correct = 0, wrong = 0, skipped = 0, total = 0;
  lessons.forEach((lesson) => {
    lessonStats[lesson] = { correct: 0, total: 10 };
    for (let i = 1; i <= 10; i++) {
      const qid = `${lesson}-${i}`;
      total++;
      const userAns = answers[qid] || [];
      const correctAns = [i % 4 === 1 ? 0 : i % 4 === 2 ? 1 : i % 4 === 3 ? 2 : 3];
      if (userAns.length === 0) {
        skipped++;
      } else if (userAns.length === correctAns.length && userAns.every((v: number) => correctAns.includes(v))) {
        correct++;
        lessonStats[lesson].correct++;
      } else {
        wrong++;
      }
    }
  });
  return { correct, wrong, skipped, total, lessonStats };
}

export default function Results() {
  const router = useRouter();
  const { answers, lessons: lessonsParam } = useLocalSearchParams();
  let parsedAnswers = answers ? JSON.parse(answers as string) : {};
  let lessonList: string[] = [];
  try {
    if (lessonsParam) {
      if (typeof lessonsParam === 'string') {
        const parsed = JSON.parse(lessonsParam) as any[];
        if (Array.isArray(parsed)) lessonList = parsed.flatMap(l => typeof l === 'string' ? l : (l && typeof l.name === 'string' ? l.name : []));
      } else if (Array.isArray(lessonsParam)) {
        lessonList = (lessonsParam as any[]).flatMap(l => typeof l === 'string' ? l : (l && typeof l.name === 'string' ? l.name : []));
      }
    }
  } catch {}
  if (!lessonList.length) lessonList = Object.keys(parsedAnswers).map(k => k.split('-')[0]);

  const { correct, wrong, skipped, total, lessonStats } = getLessonResults(parsedAnswers, lessonList);
  const percentage = Math.round((correct / (total || 1)) * 100);
  const accuracy = Math.round((correct / (correct + wrong || 1)) * 100);
  const performance = percentage >= 70 ? 'Good' : percentage >= 40 ? 'Average' : 'Needs Improvement';
  const timeTaken = '90:00'; // mock

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#3A7CA5', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}> 
        <Text style={styles.headerTitle}>Results</Text>
        <TouchableOpacity style={styles.exitBtn} onPress={() => router.replace('/practice')}>
          <LogOut size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Combined summary */}
        <Text style={styles.sectionTitle}>Overall Summary</Text>
        <View style={styles.rowBoxes}>
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Total</Text>
            <Text style={styles.resultValue}>{total}</Text>
          </View>
          <View style={[styles.resultBox, { backgroundColor: '#e0f7ef' }]}> 
            <CheckCircle size={28} color="#10b981" />
            <Text style={styles.resultLabel}>Correct</Text>
            <Text style={styles.resultValue}>{correct}</Text>
          </View>
          <View style={[styles.resultBox, { backgroundColor: '#ffeaea' }]}> 
            <XCircle size={28} color="#ef4444" />
            <Text style={styles.resultLabel}>Wrong</Text>
            <Text style={styles.resultValue}>{wrong}</Text>
          </View>
          <View style={[styles.resultBox, { backgroundColor: '#f4f4f4' }]}> 
            <Text style={[styles.resultLabel, { color: '#F4A261' }]}>Skipped</Text>
            <Text style={[styles.resultValue, { color: '#F4A261' }]}>{skipped}</Text>
          </View>
        </View>
        <View style={styles.analyticsBox}>
          <Text style={styles.analyticsLabel}>Percentage</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
          </View>
          <Text style={styles.analyticsValue}>{percentage}%</Text>
        </View>
        <View style={styles.analyticsRow}>
          <View style={styles.analyticsBoxSmall}>
            <Text style={styles.analyticsLabel}>Accuracy</Text>
            <Text style={styles.analyticsValue}>{accuracy}%</Text>
          </View>
          <View style={styles.analyticsBoxSmall}>
            <Text style={styles.analyticsLabel}>Time Taken</Text>
            <Text style={styles.analyticsValue}>{timeTaken}</Text>
          </View>
        </View>
        <View style={styles.subjectBreakdownBox}>
          <Text style={styles.subjectBreakdownTitle}>Lesson-wise Performance</Text>
          {Object.entries(lessonStats).map(([lesson, stat]) => (
            <View key={lesson} style={styles.subjectRow}>
              <Text style={styles.subjectName}>{lesson}</Text>
              <View style={styles.subjectProgressBarBg}>
                <View style={[styles.subjectProgressBarFill, { width: `${Math.round((stat.correct/stat.total)*100)}%` }]} />
              </View>
              <Text style={styles.subjectScore}>{stat.correct}/{stat.total}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.performanceText}>Performance: <Text style={{ fontWeight: 'bold', color: performance === 'Good' ? '#10b981' : performance === 'Average' ? '#F4A261' : '#ef4444' }}>{performance}</Text></Text>
      </ScrollView>
      <View style={styles.reviewBtnContainer}>
        <TouchableOpacity
          style={styles.reviewBtnModern}
          onPress={() => router.push({ pathname: '/test/review', params: { answers: JSON.stringify(parsedAnswers), lessons: JSON.stringify(lessonList) } })}
        >
          <Text style={styles.reviewBtnTextModern}>Review All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  exitBtn: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  content: { flex: 1, padding: 24 },
  rowBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  resultBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  resultLabel: {
    fontSize: 13,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginTop: 4,
  },
  resultValue: {
    fontSize: 20,
    color: '#1e293b',
    fontFamily: 'Inter-Bold',
    marginTop: 2,
  },
  analyticsBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  analyticsLabel: {
    fontSize: 14,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginBottom: 6,
  },
  analyticsValue: {
    fontSize: 18,
    color: '#1e293b',
    fontFamily: 'Inter-Bold',
    marginTop: 2,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F4A261',
    borderRadius: 4,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  analyticsBoxSmall: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  subjectBreakdownBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  subjectBreakdownTitle: {
    fontSize: 15,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  subjectName: {
    fontSize: 14,
    color: '#1e293b',
    fontFamily: 'Inter-Bold',
    width: 90,
  },
  subjectProgressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  subjectProgressBarFill: {
    height: '100%',
    backgroundColor: '#F4A261',
    borderRadius: 4,
  },
  subjectScore: {
    fontSize: 14,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    width: 40,
    textAlign: 'right',
  },
  performanceText: {
    fontSize: 18,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginVertical: 18,
    textAlign: 'center',
  },
  reviewBtnContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(248,250,252,0.95)',
    paddingBottom: 24,
    paddingTop: 8,
    alignItems: 'center',
    zIndex: 10,
  },
  reviewBtnModern: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#3A7CA5',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    width: '90%',
  },
  reviewBtnTextModern: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
}); 