import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Clock, FileText, AlertCircle, CheckCircle, Play } from 'lucide-react-native';
import React, { useState } from 'react';

// Utility to deeply flatten and filter only strings
function deepFlattenStrings(arr: any): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.flatMap((val) => {
    if (typeof val === 'string') return [val];
    if (Array.isArray(val)) return deepFlattenStrings(val);
    if (val && typeof val.name === 'string') return [val.name];
    return [];
  });
}

export default function TestInstructions() {
  const router = useRouter();
  const { testType = 'Mock Test', duration = '120', questions = '10', subject, subjects, lessons, difficulty = '', title = '' } = useLocalSearchParams();
  const [agreed, setAgreed] = useState(false);
  let subjectList: string[] = [];
  let lessonList: string[] = [];
  // Helper to ensure questions is a string
  const getQuestionsString = (q: string | string[]) => Array.isArray(q) ? q[0] : q;
  try {
    subjectList = subjects ? JSON.parse(subjects as string) : [];
  } catch {
    subjectList = [];
  }
  try {
    if (lessons) {
      if (typeof lessons === 'string') {
        const parsed = JSON.parse(lessons);
        lessonList = deepFlattenStrings(parsed) as string[];
      } else if (Array.isArray(lessons)) {
        lessonList = deepFlattenStrings(lessons) as string[];
      }
    }
    lessonList = ([] as string[]).concat(...lessonList).filter((l): l is string => typeof l === 'string');
  } catch {
    lessonList = [];
  }
  const isMulti = subjectList.length > 1;

  const instructions = [
    {
      icon: Clock,
      title: 'Time Management',
      description: `You have ${duration} to complete ${getQuestionsString(questions)} questions. Manage your time wisely.`,
      color: '#667eea',
    },
    {
      icon: FileText,
      title: 'Question Navigation',
      description: 'You can navigate between questions freely. Use the question palette to jump to any question.',
      color: '#10b981',
    },
    {
      icon: AlertCircle,
      title: 'Marking Scheme',
      description: '+4 marks for correct answer, -1 mark for wrong answer, 0 marks for unattempted questions.',
      color: '#f59e0b',
    },
    {
      icon: CheckCircle,
      title: 'Final Submission',
      description: 'Review your answers before final submission. Once submitted, you cannot make changes.',
      color: '#ef4444',
    },
  ];

  const handleStartTest = () => {
    // If lessonList is empty, use subject or 'All' as a default lesson
    const lessonsToPass = lessonList.length > 0
      ? lessonList
      : [subject || 'All'];

    // Set duration and questions based on test type
    let examDuration = 90;
    let examQuestions = 30;
    if (testType === 'combined') {
      examDuration = 180;
      examQuestions = 90;
    } else if (testType === 'previous') {
      examDuration = 180;
      examQuestions = 90;
    } else if (testType === 'mock' && subject !== 'All') {
      examDuration = 90;
      examQuestions = 30;
    }

    router.push({
      pathname: '/test/exam',
      params: {
        subject: subject || (subjectList.length ? subjectList[0] : undefined),
        lessons: JSON.stringify(lessonsToPass),
        duration: examDuration,
        questions: examQuestions,
        testType,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#3A7CA5' }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{title || 'Practice Instructions'}</Text>
          {isMulti ? (
            <Text style={styles.headerSubtitle}>You will take: {subjectList.join(', ')}</Text>
          ) : (
            <Text style={styles.headerSubtitle}>{testType}</Text>
          )}
        </View>
      </View>

      {/* Show selected lessons if present */}
      {lessonList.length > 0 && (
        <View style={styles.selectedLessonsSection}>
          <Text style={styles.selectedLessonsTitle}>Selected Lessons</Text>
          <View style={styles.selectedLessonsList}>
            {lessonList.map((lesson, idx) => (
              <View key={idx} style={styles.selectedLessonCard}>
                <Text style={styles.selectedLessonText}>{(lesson as string).replace(/^[a-z]+:/i, '').replace(/_/g, ' ')}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.testInfo}>
          <View style={styles.testInfoCard}>
            <View style={styles.testInfoItem}>
              <Text style={styles.testInfoLabel}>Duration</Text>
              <Text style={styles.testInfoValue}>{duration}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.testInfoItem}>
              <Text style={styles.testInfoLabel}>Questions</Text>
              <Text style={styles.testInfoValue}>{getQuestionsString(questions)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.testInfoItem}>
              <Text style={styles.testInfoLabel}>Total Marks</Text>
              <Text style={styles.testInfoValue}>{parseInt(getQuestionsString(questions) || '0') * 4}</Text>
            </View>
          </View>
        </View>

        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Important Instructions</Text>
          
          {instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionCard}>
              <View style={[styles.instructionIcon, { backgroundColor: instruction.color }]}>
                <instruction.icon size={24} color="#ffffff" />
              </View>
              <View style={styles.instructionContent}>
                <Text style={styles.instructionTitle}>{instruction.title}</Text>
                <Text style={styles.instructionDescription}>{instruction.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.additionalInfo}>
          <Text style={styles.sectionTitle}>Additional Guidelines</Text>
          
          <View style={styles.guidelinesList}>
            <View style={styles.guidelineItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.guidelineText}>
                Ensure stable internet connection throughout the test
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.guidelineText}>
                Do not refresh the browser or close the app during the test
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.guidelineText}>
                Questions marked for review will be highlighted in yellow
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.guidelineText}>
                Auto-submit will occur when time expires
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.warningBox}>
          <AlertCircle size={20} color="#ef4444" />
          <Text style={styles.warningText}>
            Once you start the test, the timer will begin immediately. Make sure you're ready!
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkbox, agreed && styles.checkboxChecked]}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.8}
          >
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>I have read and agree to the instructions</Text>
        </View>
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: agreed ? '#F4A261' : '#f1f5f9' }]}
          onPress={handleStartTest}
          disabled={!agreed}
        >
          <Text style={[styles.startButtonText, { color: agreed ? '#fff' : '#aaa' }]}>Start Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    // marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  testInfo: {
    marginBottom: 32,
  },
  testInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  testInfoItem: {
    alignItems: 'center',
  },
  testInfoLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 4,
  },
  testInfoValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  divider: {
    width: 1,
    backgroundColor: '#e2e8f0',
  },
  instructionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  instructionCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  instructionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  additionalInfo: {
    marginBottom: 24,
  },
  guidelinesList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  guidelineItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
    marginRight: 12,
    marginTop: 2,
  },
  guidelineText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#dc2626',
    marginLeft: 12,
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  startButton: {
    backgroundColor: '#F4A261',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  startButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3A7CA5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  checkboxChecked: {
    // No fill, just keep border color
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#3A7CA5',
    fontFamily: 'Inter-Regular',
    flex: 1,
    flexWrap: 'wrap',
  },
  selectedLessonsSection: {
    marginTop: 16,
    marginHorizontal: 24,
    marginBottom: 8,
  },
  selectedLessonsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#3A7CA5',
    marginBottom: 8,
  },
  selectedLessonsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedLessonCard: {
    backgroundColor: '#F4A261',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedLessonText: {
    color: '#fff',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },
  checkmark: {
    color: '#F4A261',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
});